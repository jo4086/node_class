const express = require('express')
const router = express.Router()
const Order = require('../models/order')
const Customer = require('../models/customer')

router
   .route('/')
   .get(async (req, res, next) => {
      try {
         const orders = await Order.findAll()
         res.status(200).json(orders)
      } catch (err) {
         console.error(err)
         next(err)
      }
   })
   .post(async (req, res, next) => {
      try {
         const correctFields = ['orderNumber', 'totalPrice', 'CustomerId']
         const receivedFields = Object.keys(req.body)

         const invalidFields = receivedFields.filter((field) => !correctFields.includes(field))

         const fieldStatus = correctFields.map((field) => {
            const status = req.body[field] ? 'Clear' : 'blank'
            return `(Essentail) ${field}: ${status}`
         })

         if (invalidFields.length > 0) {
            return res.status(400).json({
               message: '요청 파라미터 형식이 잘못되었습니다.',
               correctFields: fieldStatus,
               wrongFields: invalidFields,
            })
         }

         const { orderNumber, totalPrice, CustomerId } = req.body
         const missField = ' miss, 정보를 입력하세요 '

         const isCustomer = await Customer.findByPk(CustomerId)
         if (!isCustomer) {
            return res.status(404).json({
               message: '유효하지 않은 사용자 ID입니다.',
            })
         }

         if (!orderNumber || !totalPrice || !CustomerId) {
            return res.status(400).json({
               message: ' 필수 입력란이 비어있습니다. 확인해 주세요. ',
               missingFields: {
                  orderNumber: !orderNumber ? missField : `입력한 정보: '${orderNumber}' `,
                  totalPrice: !totalPrice ? missField : `입력한 정보: '${totalPrice}' `,
                  CustomerId: !CustomerId ? missField : `입력한 정보: '${CustomerId}' `,
               },
            })
         }
         const order = await Order.create(req.body)
         res.status(201).json(order)
      } catch (err) {
         console.error(err)
         next(err)
      }
   })

const orderData = async (req, res, next) => {
   try {
      const order = await Order.findByPk(req.params.id)

      if (!order) {
         return res.status(404).json({
            message: `order ID ${req.params.id}는 존재하지 않는 ID입니다.`,
         })
      }
      req.order = order
      next()
   } catch (err) {
      console.error(err)
      next(err)
   }
}

router
   .route('/:id')
   .all(orderData)
   .get(async (req, res) => {
      res.status(200).json(req.order)
   })
   .patch(async (req, res, next) => {
      try {
         const result = await Order.update(req.body, { where: { id: req.params.id } })

         if (result[0] === 0) {
            return res.status(400).json({ message: '수정할 데이터를 입력해주십시오.' })
         }
         console.log(`order 수정요청, ID: ${req.params.id}`)
         res.status(200).json({
            message: `orderID ${req.params.id}의 정보를 수정하였습니다.`,
            result,
         })
      } catch (err) {
         console.error(err)
         next(err)
      }
   })
   .delete(async (req, res, next) => {
      try {
         await req.order.destroy()
         console.log(`order 삭제요청, ID: ${req.params.id}`)
         res.status(200).json({
            message: `orderID ${req.params.id}의 정보를 삭제하였습니다.`,
         })
      } catch (err) {
         console.error(err)
         next(err)
      }
   })

module.exports = router
