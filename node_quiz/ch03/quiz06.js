const express = require('express')
const session = require('express-session')
const app = express()

app.use(
   session({
      name: _____, // 세션 쿠키 이름 설정
      secret: 'your-secret-key',
      resave: false,
      saveUninitialized: false,
      cookie: {
         maxAge: 1000 * 60 * 60,
         secure: false,
      },
   })
)

app.get('/set-session', (req, res) => {
   // username: 지은 으로 세션 설정
})

app.get('/get-session', (req, res) => {
   // username에 들어있는 값 출력
})

app.listen(3000, () => console.log('Server running on http://localhost:3000'))
