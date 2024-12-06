const express = require('express')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const morgan = require('morgan')

const app = express()

app.use(morgan('dev'))
app.use('/', express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

try {
   fs.readdirSync('uploads')
} catch (error) {
   console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.')
   fs.mkdirSync('uploads')
}

const upload = multer({
   storage: multer.diskStorage({
      destination(req, file, done) {
         done(null, 'uploads/')
      },
      filename(req, file, done) {
         done(null, `${Date.now()}-${file.originalname}`) // 현재시간 파일명
      },
   }),
   limits: { fileSize: 5 * 1024 * 1024 }, // 5MB 제한
})

// GET,, '/upload' 요청 처리, 파일 요청을 위한HTML폼 제공
app.get('/uploadFile', (req, res) => {
   res.sendFile(path.join(__dirname, 'multipart.html')) // multipart.html 파일 응답
})

// POST,, '/upload'의 요청처리 : 단일 파일
//업로드된 파일 정보를 출력하고 클라이언트 화면에 'ok'를 보여줌

app.post('/uploadFile', upload.fields([{ name: 'file1' }, { name: 'file2' }]), (req, res) => {
   console.log(req.files, req.body)
   res.send('클라이언트 OK')
})

// app.post('/uploadFile', upload.fields([{ name: 'file1' }, { name: 'file2' }]), (req, res) => {
//    console.log(req.files, req.body) // 업로드된 파일 정보 출력
//    res.send('ok')
// })

app.get(
   '/',
   (req, res, next) => {
      console.log('GET / 요청에서만 실행됩니다.')
      next()
   },
   (req, res) => {
      throw new Error('에러는 에러 처리 미들웨어로 갑니다.')
   },
)

app.use((err, req, res, next) => {
   console.error(err)
   res.status(500).send(err.message)
})

app.listen(3000, () => console.log('Server running on http://localhost:3000'))
