const express = require('express')
const User = require('../models/user')
const router = express.Router()

router
   .route('/')
   // get 요청 : 모든 사용자 조회
   .get(async (req, res, next) => {})
   // post 요청 : 사용자 등록
   .post(async (req, res, next) => {
      try {
         console.log('req.body ', req.body)
         const user = await User.create({
            name: req.body.name,
            age: req.body.age,
            married: req.body.married,
            comment: req.body.comment,
         })
         console.log(user) //생성된 사용자 데이터 출력
         res.status(201).json(user) // 상태코드 201과 함께 json 객체 형태로 생성된 사용자 전달
      } catch (err) {
         console.error(err)
         next(err) // 에러를 다음 미들웨어로 전달
      }
   })

module.exports = router
