const express = require('express')
const path = require('path')
const morgan = require('morgan')
const { sequelize } = require('./models') // models/index.js
require('dotenv').config() // env파일을 사용하기 위한 라이브러리

// 0. 라우터 모듈 불러오기 (12월9일)
const indexRouter = require('./routes')
const usersRouter = require('./routes/users')
const commentsRouter = require('./routes/comments')

const app = express()
app.set('port', process.env.PORT || 3000)

// ───────── 1. 데이터 베이스 연결 설정
sequelize
   .sync({ force: false })
   .then(() => {
      console.log('데이터베이스 연결 성공')
   })
   .catch((err) => {
      console.e결rror(`데이터베이스 연결 실패: ${err}`)
   })

// ───────── 2. 공통 미들웨어 설정(morgan 사용)
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


// ───────── 3. 라우터 연결 (12월9일)
app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/comments', commentsRouter)

// ───────── 4. 에러처리 미들웨어
app.use((req, res, next) => {
   const error = new Error(`${req.method} ${req.url}, 라우터가 없습니다.`)
   error.status = 404 // 404: not found
   next(error) // 다음 에러처리 미들웨어로 이동
})

app.use((err, req, res, next) => {
   const status = err.status || 500 // 500
   const message = err.message || '서버 에러' //서버 에러

   // 에러 정보를 브라우저로 전달
   res.status(status).send(`
        <h1>Error ${status}</h1>
        <p>message ${message}</p>
        `)
})

// ───────── 5. 서버 작동 확인
app.listen(app.get('port'), () => {
   console.log(`서버가 작동 중 입니다. http://localhost:${app.get('port')}`)
})



/** 1. 데이터베이스 연결설정,, sequelize는 프로미스 객체이기에 .then .catch를 사용
 * sequelize
 *      .sync({force: false}) => force: 기존테이블 초기화 여부 / 초기화false / true로 할시 잘못하면 기록한 데이터가 날아가버림
 **/