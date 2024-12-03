const express = require('express')
require('dotenv').config()

app.get('/', (req, res) => {
   res.send('스태틱 미들웨어 홈 페이지')
})

app.get('/about', (req, res) => {
   res.send('스태틱 소개 페이지')
})

app.listen(app.get('port'), () => {
   console.log(`스태틱 서버 작동중. http://localhost${app.get('port')}`)
})
