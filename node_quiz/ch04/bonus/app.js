const express = require('express')
const path = require('path')
const morgan = require('morgan')
const dotenv = require('dotenv')
const { sequelize } = require('./models')

const indexRouter = require('./routes/index')
const customersRouter = require('./routes/customers')
const ordersRouter = require('./routes/orders')

// 1. 라우터 모듈 불러오기
dotenv.config()

const app = express()
app.set('port', process.env.PORT || 5000)

// 2. 데이터베이스 연결 설정
sequelize
    .sync({force: false}) // 찾아보기
    .then(() => {console.log('DB 연결 성공')})
    .catch((err) => {
        console.error(`DB 연결 실패 ${err}`)
    })

// 3. 공통 미들웨어 설정하기
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// 4. 라우터 연결
app.use('/', indexRouter)
app.use('/customers', customersRouter)
app.use('/orders', ordersRouter)

// 5. 404 에러 처리 미들웨어
app.use((req, res, next) => {
    const error  = new Error(`${req.mathod} ${req.url} 라우터가 없습니다.`)
    error.status = 404
    next(error)
})

// 6. 에러 처리 미들웨어
app.use((err, req, res, next) => {
    const status = err.status || 500 // 상태코드 설정
    const message = err.message || '서버 에러' // 출력 에러메시지 설정

    // 에러 정보 브라우저에 직접 전달
    res.status(status).send(`
        <h1>Error ${status}</h1>
        <p>${message}</p>
        ${process.env.NODE_ENV !== 'production' ? `<pre>${err.stack}</pre>` : ''}
        `) // 개발환경에서만 에러정보 출력
})

// 7. 서버시작
app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기중')
})



