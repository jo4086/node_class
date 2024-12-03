const express = require('express')
const session = require('express-session')
const title = '세션'
require('dotenv').config()

const app = express()
app.set('port', process.env.PORT || 3000)
/**
 * 세션 설정
 **/
app.use(
   session({
      name: 'my-session-cookie', // 세션 id를 저장하는 쿠키의 이름 (자유 지정 o)
      secret: 'your secret-key', // 세션을 암호화하는 키 자유 지정 키
      resave: false, // 세션 데이터가 바뀌지 않아도 저장소에 다시 지정할 지 여부

      saveUninitiallized: false, // 초기화 되지 않은 세션의 저장 여부
      cookie: {
         maxAge: 1000 * 60 * 60, //세션 id를 저장하는 쿠키의 저장 시간
         secure: false, // https를 사용할 때만 쿠키 전송 함
      },
   })
)

/** 각 섹션 키에 값 저장
 * [key = value]
 * [username = '준근']
 * [role = 'admin']
 * 세션 객체는 자체 서버에 저장
 * 세션 객체가 생성될 때 같이 생성되는 세션 id는 cookie에 저장되어 response처리
 **/
app.get('/set-session', (req, res) => {
   req.session.username = '준근'
   req.session.role = 'admin'
   res.send('세션에 데이터가 저장되었습니다.')
})

/** 세션 값 확인
 *
 **/
app.get('/get-session', (req, res) => {
   const { username, role } = req.session
   if (username && role) {
      res.send(`username: ${username}<br>role: ${role}<br>세션 id: ${req.sessionID}`)
   } else {
      res.send('세션을 찾을 수 없습니다.')
   }
})

/** 세션 값 삭제
 * set-session => get-session : 세션 값 확인가능
 * 이후에
 * destroy-session => get-session : 세션 값 확인 불가능,,
 * 그러나 쿠키는 남아있다.
 **/
app.get('/destroy-session', (req, res) => {
   req.session.destroy((err) => {
      if (err) {
         res.send(`세션 삭제 실패 : ${err.message}`)
      } else {
         res.send('세션이 삭제되었습니다')
      }
   })
})

/** 프로토콜 통신 규약
 * 'http', 'https'
 * 'http' :
 * 'https' :
 */

app.listen(app.get('port'), () => {
   console.log(`${title}서버가 작동 중 입니다. http://localhost:${app.get('port')}`)
})
