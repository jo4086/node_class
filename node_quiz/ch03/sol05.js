const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()

// cookie-parser 미들웨어 사용
app.use(cookieParser())

// '/setId' 라우트에서 쿠키 설정
app.get('/setId', (req, res) => {
   res.cookie('id', 'user1', { maxAge: 1000 * 60 * 60 }) // 1시간 동안 유효
   res.send('쿠키가 설정되었습니다!')
})

// '/getId' 라우트에서 쿠키 읽기
app.get('/getId', (req, res) => {
   const id = req.cookies.id
   res.send(id ? `환영합니다, ${id}님.` : '쿠키가 없습니다.')
})

app.listen(3000, () => console.log('Server running on http://localhost:3000'))
