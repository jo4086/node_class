const express = require('express')
const session = require('express-session')
const app = express()

// express-session 설정
app.use(
   session({
      name: 'myName', // 세션 쿠키 이름 설정
      secret: 'your-secret-key', // 세션을 암호화하는 키
      resave: false, // 세션 데이터가 바뀌지 않아도 저장소에 다시 저장할지 여부
      saveUninitialized: false, // 초기화되지 않은 세션을 저장할지 여부
      cookie: {
         maxAge: 1000 * 60 * 60, // 쿠키의 수명 (밀리초 단위)
         secure: false, // HTTPS를 사용할 때만 쿠키 전송
      },
   })
)

// '/set-session' 라우트에서 세션 설정
app.get('/set-session', (req, res) => {
   req.session.username = '지은'
   res.send('세션이 설정되었습니다!')
})

// '/get-session' 라우트에서 세션 값 읽기
app.get('/get-session', (req, res) => {
   const username = req.session.username
   res.send(username ? `Hello, ${username}` : '세션이 없습니다.')
})

app.listen(3000, () => console.log('Server running on http://localhost:3000'))
