const express = require('express')
const router = express.Router()
const Customer = require('../models/customer')
const Order = require('../models/order')

router.get('/', (req, res, next) => {
   res.status(200).json({
      message: '고객 ID를 입력하여 주문기록을 조회하세요.',
   })
})

router.get('/customers/:id/orders', async (req, res, next) => {
   try {
      const customerId = req.params.id
      const customer = await Customer.findByPk(customerId)

      if (!customer) {
         return res.status(404).json({
            message: `요청한 고객ID: ${req.params.id}의 정보는 유효하지 않습니다.`,
         })
      }

      const ordersOfCustomer = await Order.findAll({ where: { CustomerId: customerId } })

      const customerWithOrders = {
         ...customer.toJSON(), // Sequelize 객체 => 일반 객체로 변환
         orders: ordersOfCustomer.map((order) => {
            // CustomerId는 이미 요청한사람의 id값과 중복되어 보여주기에 객체 구조 분해를 이용하여 데이터를 나누고 리턴문에 제외시켜 출력란에 보이지 않게 제외시킴
            const { id, CustomerId, ...rest } = order.toJSON()
            return {
               order_ID: id,
               ...rest,
            }
         }),
      }

      console.log(`orderList 요청, 요청ID :${req.params.id}`)
      res.status(200).json(customerWithOrders)
   } catch (err) {
      console.error(err)
      next(err)
   }
})

module.exports = router

/** inClude를 사용한 방법!!
            const customerWithOrders = await Customer.findByPk(customerId, {
                include: [
                    {
                        model: Order, // 연관된 주문 모델
                        as: 'orders', // 관계 설정 시 정의한 별칭 (associate 메서드에서 설정)
                    },
                ],
            });
      */
