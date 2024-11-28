const express = require('express')
const path = require('path')
const app = express()

// 정적 파일 제공
app.use(express.static(path.join(__dirname, 'public')))

app.listen(3000, () => console.log('Server running on http://localhost:3000'))
