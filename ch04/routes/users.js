const express = require('express')
const User = require('../models/user')
const Comment = require('../models/comment')
const router = express.Router()

router
   .route('/')
   // GET 요청 : 모든 사용자 조회
   .get(async (req, res, next) => {
      try {
         const users = await User.findAll() // findAll() = SELECT * FROM users;
         res.status(200).json(users)
      } catch (error) {
         console.error(error)
         next(error)
      }
   })

   // POST 요청 : 사용자 등록
   .post(async (req, res, next) => {
      try {
         console.log('req.body: ', req.body)
         const user = await User.create({
            name: req.body.name, // 클라이언트에서 받은 값들을 Column값으로 저장
            age: req.body.age,
            married: req.body.married,
            comment: req.body.comment,
         })
         console.log(user) // 생성된 사용자 데이터 출력
         res.status(201).json(user) // 상태코드 201과 함께 json객체 형태로 생성된 사용자 전달
      } catch (err) {
         console.error(err)
         next(err) // 에러를 에러 미들웨어로 전달
      }
   })

// localhost:8000/user/:id/comments
router.get('/:id/comments', async (req, res, next) => {
   try {
      const comments = await Comment.findAll({
         include: {
            model: User,
            where: { id: req.params.id },
         },
      })
      console.log(comments)
      res.status(200).json(comments)
   } catch (error) {
      console.error(error)
      next(error)
   }
})

module.exports = router
