const express = require('express')
const app = express()

// 전역 미들웨어: 모든 요청에 대해 실행됩니다.
app.use((req, res, next) => {
   console.log(`Request Method: ${req.method}, Request URL: ${req.url}`)
   next()
})
app.get('/', (req, res) => {
   res.send('Hello, World!')
})

app.listen(3000, () => console.log('Server running on http://localhost:3000'))
