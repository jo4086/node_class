const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

router.get('/', async (req, res, next) => {
   res.status(200).json({message: 'auth페이지에 어서오세요'})
} )
// 회원가입

router
   .post('/join', async (req, res, next) => {
      const { email, nick, password } = req.body
      try {
         const exUser = await User.findOne({ where: { email } })
         if (exUser) {
            return res.status(409).json({
               success: false,
               message: '이미 존재하는 Email입니다.'
            })
         }
         const hash = await bcrypt.hash(password, 12)

         const newUser = await User.create({
            email,
            nick,
            password: hash
         })

         res.status(201).json({
            success: true,
            message: '사용자가 정상적으로 등록되었습니다.',
            user: {
               id: newUser.id,
               email: newUser.email,
               nick: newUser.nick,
            }
         })
      } catch (error) {
         console.error(error)
         res.status(500).json({
            success: false,
            message: '회원가입 중 오류가 발생하였습니다.',
            error,
         })
         next(error)
      }
   })

/*
router.post('/join', async (req, res, next) => {
   const { email, nick, password } = req.body
   try {
      const exUser = await User.findOne({ where: { email } })
      if (exUser) {
         return res.status(409).json({ success: false, message: '이미 존재하는 아이디 입니다.' })
      }
      // 이메일 중복 확인 통과시 새 계정 생성

      // 비밀번호 암호화
      const hash = await bcrypt.hash(password, 12) //  12: salt(해시 암호화를 진행시 추가되는 임의의 데이터로 10~12 정도의 값 길이 권장)

      // 새로운 사용자 생성
      const newUser = await User.create({
         email,
         nick,
         password: hash,
      })

      // 성공 응답 반환
      res.send(201).json({
         success: true,
         message: '사용자가 정상적으로 등록되었습니다.',
         user: {
            id: newUser.id,
            email: newUser.email,
            nick: newUser.nick,
         },
      })
   } catch (err) {
      // try문 어딘가에서 에러가 발생서하면 500상태코드와 json객체 응답
      console.error(err)
      res.status(500).json({
         success: false,
         message: '화원가입 중 오류가 발생하였습니다.',
         error,
      })
      next(err)
   }
})

*/

// 로그인 localhost:8000/auth/login
router.post('/login', async (req, res, next) => {})

// 로그아웃 localhost:8000/auth/logout
router.get('/logout', async (req, res) => {})

// 로그인 상태 확인 localhost:8000/
router.get('/status', async (req, res) => {})

module.exports = router