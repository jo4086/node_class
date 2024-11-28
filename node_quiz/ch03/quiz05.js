const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()

app.use(cookieParser())

app.get('/setId', (req, res) => {
   // 1시간 동안 유효하고 name: id, value: user1인 쿠키를 만든다
})

app.get('/getId', (req, res) => {
   // 쿠키 value값 읽어서 화면에 출력하기
})

app.listen(3000, () => console.log('Server running on http://localhost:3000'))
