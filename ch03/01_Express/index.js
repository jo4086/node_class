const express = require('express')
// require('dotenv').confgi() // env파일을 감싸기 위한 라이브러리 로드

const app = express()
// 포트 설정
// 서버 포트에 지정(env파일에)값이 없으면 3000에 실행
// app.set('port', process.env.PORT || 3000) // 서버에 포트지정,,, 바꿔야할 상황이 많으므로 직접 저렇게 포트번호를 안넣음

app.set('port', 8000) // 서버에 포트지정,,, 바꿔야할 상황이 많으므로 직접 저렇게 포트번호를 안넣음



/*
 * app.get() => read 요청
 * app.post() => create 요청
 * app.delete() => 삭제 요청
 * app.put() => 전체 수정 요청
 * app.patch() => 일부 수정 요청
 */


// 클라이언트는 서버에게 읽을 데이터를 주라고 요청
// localhost:8000으로 request가 온 경우 실행
app.get('/', (req, res) => {
   res.send('안녕! node!') // 클라에 응답 보냄
})

app.get('/test', (req, res) => {
   res.send('안녕! test!')
})

// 서버 실행
app.listen(app.get('port'), () => {
   console.log(` ▼ 서버가 작동 중 입니다.\n http://localhost:${app.get('port')}`)
})
