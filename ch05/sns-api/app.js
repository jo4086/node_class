const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const session = require('express-session')
// const https = require('https')
// const fs = require('fs')

require('dotenv').config() // 환경변수 관리
const cors = require('cors') // cors 미들웨어 -> api 서버의 필수 라이브러리

// 라우터 및 기타 모듈 불러오기
const { sequelize } = require('./models')
const indexRouter = require('./routes')
const authRouter = require('./routes/auth')

const app = express()
app.set('port', process.env.PORT || 8002)

// const options = {
//   key: fs.readFileSync('./ssl/key.pem'),
//   cert: fs.readFileSync('./ssl/cert.pem')
// }

// 시퀄라이즈를 사용한 DB 연결
sequelize
   .sync({ force: false })
   .then(() => {
      console.log('데이터베이스 연결 성공') // 연결 성공 출력
   })
   .catch((err) => {
      console.error(err) // 연결 실패시 오류 출력
   })

app.use(
   cors({
      origin: 'http://localhost:3000', // 특정 주소만 request 허용
      credentials: true, // 쿠키, 세션 등 인증정보 허용
   }),
)

// 미들웨어 설정
app.use(morgan('dev')) // HTTP 요청 로깅 (dev 모드)
app.use(express.static(path.join(__dirname, 'uploads'))) // 정적 파일 제공
app.use(express.json()) // JSON 데이터 파싱
app.use(express.urlencoded({ extended: false })) // URL-encoded 데이터 파싱

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ Router Middleware
// 라우터 등록
app.use('/', indexRouter)
app.use('/auth', authRouter)

// 잘못된 라우터 경로 처리
app.use((req, res, next) => {
   const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`) // 에러 객체 생성
   error.status = 404 // 404 상태코드 설정
   next(error) // 에러 미들웨어로 전
})
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ Router Middleware

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ Error Middleware
app.use((err, req, res, next) => {
   const statusCode = err.status || 500
   const errorMessage = err.message || '서버 내부 오류'

   res.status(statusCode).json({
      success: false,
      message: errorMessage,
      error: err,
   })
})

// app.options('*', cors()) // 모든 경로에 대한 options 요청을 허용
app.listen(app.get('port'), () => {
   console.log(app.get('port'), '번 포트에서 대기중')
})

// https.createServer(options, app).listen(app.get('port'), () => {
//      console.log(`HTTPS 서버가 실행 중: https://localhost:${app.get('port')}`)
// })