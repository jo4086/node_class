const express = require('express')
const router = express.Router()
const { sequelize } = require('../models')
const { Order, Item, User, OrderItem, Img } = require('../models')
const { isLoggedIn } = require('./middlewares')
const { Op } = require('sequelize')

// 주문
router.post('/', isLoggedIn, async (req, res) => {
    const { items } = req.body
    // req.body = { items = [{ itemId: 1, count: 2 }, { itemId: 2, count: 1 }] }

    /** ★ 트랜잭션 처리: 주문 처리 중 에러 발생시 차감된 재고를 복구하지 않으면 데이터가 불일치 상태 => 트랜잭션으로 해결
     ** <아래 3가지가 나눌 수 없는 업무 단위인 트랜잭션으로 묶임, 하나라도 문제 발생시 모두 취소>
     * 1. Table - [Order]에 주문내역 insert
     * 2. Table - [Items]에서 재고 차감
     * 3. Table - [OrderTable]에 주문상품 insert
     **/

    const transaction = await sequelize.transaction() // 트랜잭션 시작

    try {
        // 회원 확인
        const user = await User.findByPk(req.user.id)
        if (!user) {
            throw new Error('회원이 존재하지 않습니다.')
        }

        // 1. Order 테이블에 주문 내역 insert
        // 주문 생성
        const order = await Order.create(
            {
                userId: user.id,
                orderDate: new Date(),
                orderStatus: 'ORDER',
            },
            { transaction }, // Order.create, Item.findByPk, product.save, OrderItem.bulkCreate 등 모든 데이터 작업에 { transaction } 옵션을 추가하여 동일 트랜잭션 내에서 실행되도록 처리
        )

        // 2. Item 테이블에서 재고 차감

        let totalOrderPrice = 0 // 총 주문상품 가격

        /*
            Promise.all(...): 비동기 작업들을 병렬실행 => 성능 최적화

            각 비동기 작업 async (item) => { .. } 을 병렬로 실행.
            아래와 같이 for문을 이용한 처리방법: 성능상 효율↓
            But, 단순하게 [findByPk]만 한다면 처for문도 괜찮음,
            
            현재 작업은 3가지 작업을 해야하기에 Promise.all이 효율성이 더 높다.
            
            for(const item of items) {
            const product  = await Item.findByPk(item.itemId, { transaction })
            }
        **/

        const orderItemsData = await Promise.all(
            items.map(async (item) => {
                const { itemId, count } = item

                // 1. 상품이 있는지 확인
                const product = await Item.findByPk(itemId, { transaction })
                if (!product) {
                    throw new Error(`상품 id: ${itemId}에 해당하는 상품이 존재하지 않습니다.`)
                }

                if (product.stockNumber < count) {
                    throw new Error(`상품 id: ${itemId}에 해당하는 상품의 재고가 부족합니다.`)
                }

                // 2. 재고 차감
                product.stockNumber -= count

                // 3. 재고 차감 후 [item] 테이블에 저장
                await product.save({ transaction }) // update대신 save, 시퀄라이저에서는 동일 컬럼의 값을 바꿀때 update대신 save를 쓸 수 있다.

                // 4. 총 주문 상품 가격 누적 합산
                const orderItemPrice = product.price * count
                totalOrderPrice += orderItemPrice

                // 5. [orderItems] 테이블에 insert 해줄 값을 return
                return {
                    orderId: order.id,
                    itemId: product.id,
                    orderPrice: orderItemPrice,
                    price: product.price,
                    count,
                }
            }),
        )

        // 3. OrderTable 테이블에 주문상품 insert
        await OrderItem.bulkCreate(orderItemsData, { transaction })

        // 트랜잭션 커밋
        await transaction.commit()

        res.status(201).json({
            success: true,
            message: '주문이 성공적으로 생성되었습니다.',
            orderId: order.id, // 주문 id
            totalPrice: totalOrderPrice, // 총 주문 상품 금액
        })
    } catch (error) {
        await transaction.rollback() // 트랜잭션 롤백

        console.error(error)
        res.status(500).json({
            success: false,
            message: '주문 중 오류가 발생하였습니다.',
            error,
        })
    }
})

// 주문 목록(페이징)
// localhost:8000/order/list?page=1&limit=5&startDate=2025-01-01&endDate=2025-01-16
router.get('/list', isLoggedIn, async (req, res) => {
    try {
        const { query } = req

        const page = parseInt(query.page, 10) || 1
        const limit = parseInt(query.limit, 10) || 5
        const offset = (page - 1) * limit
        const startDate = query.startDate
        const endDate = query.endDate
        const endDateTime = `${endDate} 23:59:59`

        const count = await Order.count({ where: { userId: req.user.id, ...(startDate && endDate ? { createdAt: { [Op.between]: [startDate, endDateTime] } } : {}) } })

        // 로그인한 사람의 주문 상품 목록 가져오기
        const orders = await Order.findAll({
            where: {
                userId: req.user.id,
                ...(startDate && endDate ? { createdAt: { [Op.between]: [startDate, endDateTime] } } : {}),
            },
            limit: parseInt(limit),
            offset: parseInt(offset),
            include: [
                {
                    model: Item,
                    attributes: ['id', 'itemNm', 'price'], // 필요한 데이터만 선택
                    // 교차테이블 데이터
                    through: {
                        attributes: ['count', 'orderPrice'], // OrderItem 테이블에서 필요한 컬럼 선택
                    },
                    include: [
                        {
                            model: Img,
                            attributes: ['imgUrl'],
                            where: { repImgYn: 'Y' },
                        },
                    ],
                },
            ],
            order: [['orderDate', 'DESC']],
        })

        res.status(200).json({
            success: true,
            message: '주문 목록 조회 성공',
            orders,
            pagination: {
                totalOrders: count,
                totalPages: Math.ceil(count / limit),
                currentPage: page,
                limit,
            },
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            message: '주문내역 조회 중 오류가 발생했습니다.',
            error,
        })
    }
})

router.post('/cancel/:id', isLoggedIn, async (req, res) => {
    const transaction = await sequelize.transaction()

    try {
        const { id } = req.params

        // 사용자 id를 기반으로 주문내역 조회
        const order = await Order.findByPk(id, {
            include: [
                {
                    model: OrderItem,
                    include: [{ model: Item }],
                },
            ],
            transaction,
        })

        // 주문이 존재하지 않음
        if (!order) {
            return res.status(400).json({
                success: false,
                message: '주문내역이 존재하지 않습니다.',
            })
        }

        // 이미 취소된 주문
        if (order.orderStatus === 'CANCEL') {
            return res.status(400).json({
                success: false,
                message: '이미 취소된 주문입니다.',
            })
        }

        // 재고복구
        for (const orderItem of order.OrderItems) {
            const product = orderItem.Item
            product.stockNumber += orderItem.count
            await product.save({transaction}) // 트랜잭션
        }

        // 주문 상태 변경
        order.orderStatus = 'CANCEL'
        await order.save({transaction})

        await transaction.commit() // 트랜잭션 커밋
        
        res.json({
            success: true,
            message: '주문이 성공적으로 취소되었습니다.'
        })

    } catch (error) {
        await transaction.rollback() // 트랜잭션 롤백
        console.error(error)
        res.status(500).json({
            success: false,
            message: '주문 취소 중 오류가 발생했습니다.',
            error
        })
    }
})

// 주문 내역 삭제
router.delete('/delete/:id', isLoggedIn, async (req, res) => {
    try {
        const { id } = req.params

        const order = await Order.findByPk(id)

        if (!order) {
            return res.status(400).json({
                success: false,
                message: '주문 내역이 존재하지 않습니다.'
            })
        }

        //주문삭제(CASCADE설정으로 인해 orderItem도 삭제)
        await Order.destroy({ where: { id: order.id } })

        res.json({
            success: true,
            message: '주문 내역 정상적으로 삭제되었습니다.'
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            message: '주문 내역 삭제 중 오류가 발생하였습니다.',
            error
        })
    }
} )

module.exports = router
