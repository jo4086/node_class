const express = require('express')
const router = express.Router()
const Customer = require('../models/customer')

router
   .route('/')
   .get(async (req, res, next) => {
      try {
         const customers = await Customer.findAll()
         res.status(200).json(customers)
      } catch (err) {
         console.error(err)
         next(err)
      }
   })
   .post(async (req, res, next) => {
      try {
         if (!req.body.fullName || !req.body.email) {
            return res.status(400).json({ message: 'fullName과 email은 필수 입력란 입니다.' })
         }

         const isDuplicateEmail = await Customer.findOne({ where: { email: req.body.email } })
         if (isDuplicateEmail) {
            // status(409): 중복된 데이터 존재 경고
            return res.status(409).json({
               message: '이미 사용 중인 이메일입니다.',
            })
         }

         console.log('req.body: ', req.body)
         const newCustomer = await Customer.create({
            fullName: req.body.fullName,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
         })
         console.log(newCustomer)
         res.status(201).json(newCustomer)
      } catch (err) {
         console.error(err)
         next(err)
      }
   })

const customerData = async (req, res, next) => {
   try {
      const customer = await Customer.findByPk(req.params.id)
      if (!customer) {
         return res.status(404).json({ message: `ID ${req.params.id}는 존재하지 않는 ID입니다.` })
      }
      req.customer = customer
      next()
   } catch (err) {
      console.error(err)
      next(err)
   }
}

router
   .route('/:id')
   .all(customerData)
   .get(async (req, res) => {
      res.status(200).json(req.customer)
   })
   .patch(async (req, res, next) => {
      try {
         const result = await Customer.update(
            {
               fullName: req.body.fullName,
               email: req.body.email,
               phoneNumber: req.body.phoneNumber,
            },
            {
               where: { id: req.params.id },
            },
         )
         if (result[0] === 0) {
            return res.status(400).json({ message: '수정된 정보가 없습니다.' })
         }

         const afterInfo = await Customer.findByPk(req.params.id)

         res.status(200).json({
            message: `ID ${req.params.id}의 회원 정보를 수정하였습니다.`,
            beforeInfo: req.customer,
            afterInfo,
         })
      } catch (err) {
         console.error(err)
         next(err)
      }
   })
   .delete(async (req, res, next) => {
      try {
         await req.customer.destroy()
         res.status(200).json({ message: `ID ${req.params.id}의 회원 정보가 삭제되었습니다.` })
      } catch (err) {
         console.error(err)
         next(err)
      }
   })

module.exports = router
