const express = require('express')
const app = express()

app.use((req, res, next) => {
   // 첫 번째 미들웨어: 요청에 따라 다른 미들웨어 호출
})

function adminMiddleware(req, res, next) {
   console.log('Admin middleware executed')
}

function userMiddleware(req, res, next) {
   console.log('User middleware executed')
}

app.listen(3000, () => console.log('Server running on http://localhost:3000'))
