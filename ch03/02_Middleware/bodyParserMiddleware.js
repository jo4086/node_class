const express = require('express')
const path = require('path')
require('dotenv').config()

const app = express()
app.set('port', process.env.PORT || 3000)

app.get('/', (req, res) => {
   // submit.html 페이지 response
   // C:\project\node_class\ch03\02_Middleware\submit.html
   res.sendFile(path.join(__dirname, 'submit.html'))
})


/** 4. body-parser 미들웨어
 * request 본문을 쉽게 처리할 수 있게 도와주는 미들웨어 
 **/

// 요청 데이터를 json 객체로 받게함
app.use(express.json())

// URL-encoded 요청 본문 처리
/** application/x-www-form-urlencoded 형식
 * HTML <form>에서 데이터를 전송할 때 기본적으로 사용되는 데이터 형식.
 * 데이터를 key=value&key2=value2의 형태로 인코딩하여 요청 본문에 포함.

 * 예) HTML <form> 데이터를 URL-encoded 방식으로 전송:
 * <form method="POST" action="/submit">
      <input type="text" name="name" />
      <input type="text" name="age" />
      <button type="submit">Submit</button>
 * </form>

 * 전송된 요청 본문
 * 
 **/

/** URL-encoded 요청 처리
 * 데이터 전송 시 name=""에 있는 부분을 쿼리스트링으로 바꿔줌??
 * 입력값이 "김서방", "28"이라면
 * 'name=김서방&age=28' 처럼 묶어줌
 **/
app.use(express.urlencoded({ extended: true }))

app.post('/submit', () => {
    // form 태그에서 입력한 데이터가 들어있다.
    console.log('req.body: ',req.body)
    res.send('데이터 수신 완료!')
})

// app.get('/about', (req, res) => {
//    console.log(req.body)
//    res.send('바디 데이터 겟')
// })

app.listen(app.get('port'), () => {
   console.log(`바디 서버 작동중. http://localhost${app.get('port')}`)
})
