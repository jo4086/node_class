// 5. 에러 발생 미들웨어

const express = require('express')
const path = require('path')
require('dotenv').config()

const app = express()
app.set('port', process.env.PORT || 3000)

app.get('/', (req, res) => {
   res.send('에러 미들웨어 홈 페이지')
})

// 강제로 에러를 발생시키는 코드
app.get('/error', (req, res, next) => {
   const err = new Error('에러 발생') // 강제 에러 발생
   err.status = 500 // http 상태 코드 지정
   next(err)
})

/** 에러처리 미들웨어
 * 매개변수에 err가 있는 경우
 **/
app.use((err, req, res, next) => {
   console.error('Error: ', err.message)
   res.status(err.status || 500).json({
      error: {
         message: err.message || '서버 내부 에러',
      },
   })
})

app.get('/about', (req, res) => {
   res.send('에러 소개 페이지')
})

app.listen(app.get('port'), () => {
   console.log(`에러 서버 작동중. http://localhost${app.get('port')}`)
})
