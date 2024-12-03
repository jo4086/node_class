const express = require('express')
const path = require('path')
require('dotenv').config()

const app = express()
app.set('port', process.env.PORT || 3000)

// 3. static 미들웨어 사용 : 정적 파일에 바로 접근하게 하는 미들웨어
console.log(__dirname)

// http://localhost:8000/style.css,
// http://localhost:8000/dog.png로 public 폴더의 정적파일에 바로 접근 가능
// localhost:8000/로 들어왔을떄
// C:\project\node_class\ch03\02_Middleware\public으로 바로 접근하게 함
app.use('/', express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
   res.send('스태틱 미들웨어 홈 페이지')
})

app.get('/about', (req, res) => {
   res.send('스태틱 소개 페이지')
})

app.listen(app.get('port'), () => {
   console.log(`스태틱 서버 작동중. http://localhost${app.get('port')}`)
})
