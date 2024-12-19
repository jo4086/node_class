const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const session = require('express-session')
const passport = require('passport')
require('dotenv').config()
const cors = require('cors')


// 라우터 및 기타 모듈 불러오기
const { sequelize } = require('./models')
const indexRouter = require('./routes')
const authRouter = require('./routes/auth')
const postRouter = require('./routes/post')
const pageRouter = require('./routes/page')
const userRouter = require('./routes/user')
const passportConfig = require('./passport')

const app = express()
passportConfig()
app.set('port', process.env.PORT || 8002)


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
app.use(cookieParser(process.env.COOKIE_SECRET)) // 쿠키 설정

// 세션 설정
app.use(
    session({
        resave: false, // 세션 data 변경시 재저장 여부
        saveUninitialized: true, // 초기화 되지 않은 세션 저장 여부
        secret: process.env.COOKIE_SECRET, // 세션 암오화 키
        cookie: {
            httpOnly: true, // javascript로 쿠키에 접근 가능한지? true: 접근불가
            secure: false, // https일 때만 쿠키 전송 여부 false: http도 전송 가능
        },
    }),
)

// Passport 초기화, 세션 연동
app.use(passport.initialize()) // 초기화
app.use(passport.session()) //Passport와 생성해둔 세션 연결

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ Router Middleware
// 라우터 등록
app.use('/', indexRouter)
app.use('/auth', authRouter)
app.use('/post', postRouter)
app.use('/page', pageRouter)
app.use('/user', userRouter)

// 잘못된 라우터 경로 처리
app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`) // 에러 객체 생성
    error.status = 404 // 404 상태코드 설정
    next(error) // 에러 미들웨어로 전달
})
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ Router Middleware

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ Error Middleware
app.use((err, req, res, next) => {
    const statusCode = err.status || 500
    const errorMessage = err.message || '서버 내부 오류'

    // 개발 중에 콘솔에서 에러 확인용
    console.log(err)

    res.status(statusCode).json({
        success: false,
        message: errorMessage,
        error: err,
    })
})

app.options('*', cors()) // 모든 경로에 대한 options 요청을 허용
app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기중')
})

// https.createServer(options, app).listen(app.get('port'), () => {
//      console.log(`HTTPS 서버가 실행 중: https://localhost:${app.get('port')}`)
// })
