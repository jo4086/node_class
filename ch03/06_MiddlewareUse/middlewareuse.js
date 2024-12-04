const express = require('express')
require('dotenv').config()
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const path = require('path')

const app = express()
app.set('port', process.env.PORT || 3000)

// app.use((req, res, next) => {
//     console.log('모든 요청 실행')
//     next()
// })


// 여러 미들웨어 동시 사용
app.use(
    morgan('dev'),
    express.static(path.join(__dirname, 'public')),
    express.json(),
    express.urlencoded({ extended: false }), cookieParser('my-secret-key')
)


app.listen(app.get('port'), () => {
   console.log(`서버가 작동 중 입니다. http://localhost:${app.get('port')}`)
})
