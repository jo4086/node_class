const express = require('express')
const dotenv = require('dotenv') // env파일을 사용하기 위한 라이브러리
const path = require('path')
const morgan = require('morgan')

const { sequelize } = require('./models') // models index.js

const indexRouter = require('./routes')
const usersRouter = require('./routes/users')
const commentsRouter = require('./routes/comments')

dotenv.config()
const app = express()
app.set('port', process.env.PORT || 3000)

sequelize
   .sync({ force: false }) // 기존 테이블을 초기화 할지 여부 -> 초기화 x
   .then(() => {
      console.log('데이터베이스 연결 성공')
   })
   .catch((e) => {
      console.log('데이터베이스 연결 실패 : ' + e)
   })

// 공통 미들웨어 설정
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// 라우터 연결
app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/comments', commentsRouter)

// 에러처리 미들웨어
app.use((req, res, next) => {
   const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`)
   error.status = 404
   next(error)
})
app.use((err, req, res, next) => {
   const status = err.status || 500
   const message = err.message || '서버 에러'

   res.status(status).send(`
   <h1>Error : ${status}</h1>
   <p>${message}</p>
   `)
})

app.listen(app.get('port'), () => {
   console.log(`서버가 작동 중 입니다. http://localhost:${app.get('port')}`)
})
