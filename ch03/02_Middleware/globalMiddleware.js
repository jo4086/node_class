const express = require('express')
require('dotenv').config() // env파일 사용위해 설정


const app = express()
app.set('port', process.env.PORT || 3000)

// 1. 전역 미들웨어 : 애플리케이션의 모든 request에서 동작하는 미들웨어
// 미들웨어는 use() 함수 사용,, 갯수 제한 없음
// request - 미들웨어 - response 중간에서 동작
// 매개변수는 3가지 존재 리퀘스트 리스폰스 넥스트
// request(req) : request에 대한 정보가 들어있는 객체
// response(res) : response에 대한 정보가 들어있는 개체 (주로 응답할 때)
app.use((req, res, next) => {
	console.log(`${req.method}, ${req.url}`)
	console.log('미들웨어 1실행')
	next() // 2번째 미들웨어로 이동( 2번째 실행)
})

app.use((req, res, next) => {
	console.log('2번째 미들웨어')
	next() // 다음에 app.use가 없으면 app.get()으로 이동
})

app.get('/', (req, res) => {
	res.send('홈페이지')
})

app.get('/about', (req, res) => {
	res.send('소개 페이지')
})

app.listen(app.get('port'), () => {
	console.log(`서버가 작동 중 입니다. http://localhost:${app.get('port')}`)
})
	
