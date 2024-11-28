const express = require('express')
const app = express()

app.use((req, res, next) => {
   // 미들웨어: res.locals에 사용자 이름 저장
   res.locals.username = '지은'
   next()
})

app.get('/', (req, res) => {
   // 라우트 핸들러: res.locals에 저장된 데이터를 사용하여 응답
   const username = res.locals.username
   res.send(username ? `Welcome, ${username}!` : 'No user found!')
})

app.listen(3000, () => console.log('Server running on http://localhost:3000'))
