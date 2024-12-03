const express = require('express')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const morgan = require('morgan')
require('dotenv').config()

const app = express()
app.set('port', process.env.PORT || 3000)

app.use(morgan('dev'))
app.use('/', express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

/** 업로드 폴더 확인 및 생성
 * readdirSync : 해당 키워드 폴더가 있는지 확인함
 * 해당 키워드 폴더가 없으면 [catch]문에서 fs.mkdirSync로 폴더를 생성하는 로직
 * dir = 폴더를 뜻하므로,,, read dir Sync => 폴더를 읽으며 Sync로 해당 코드의 확인이 끝나야 다음껄 진행함
 **/


try {
   fs.readdirSync('uploads')
} catch (error) {
   // 폴더가 없을 시 에러 발생
   console.log('upload 폴더가 없어 upload 폴더를 생성합니다.')
   fs.mkdirSync('uploads') // 업로드 폴더 생성
}

/** 멀터로 설정
 * [storage] : 업로드 파일 저장 경로 설정
 *  ├─[destination] : 실제 저장하는 곳
 *  └─[filename] : 여러 사용자가 같은 파일을 올리면 이름이 중복되기에 이름을 변환함
 *      ├─[extname] : 확장자만 추출하는 메서드
 *      └─[done(null, 변경할 파일명)]
 *          ├─[basename] : 확장자를 제외한 이름을 가져오는 메서드 (dog.png => dog만 추출)
 *          └─[+ Date.now()] : 파일명 뒤에 저장날짜를 추가해서 고유의 파일명으로 변환
 * [limits] : 업로드 파일 크기 제한 (5byte * 10^3 * 10^3 = 5 KByte * 10^3 = 5 Mbyte)
 **/
const upload = multer({
   storage: multer.diskStorage({
      destination(req, file, done) {
         done(null, 'uploads/') // uploads 폴더에 저장
      },
      filename(req, file, done) {
         // file.originalname = dog.png
         // ext = .png
         const ext = path.extname(file.originalname) // 파일 확장자 추출

         done(null, path.basename(file.originalname, ext) + Date.now() + ext)
      },
   }),
   limits: { fileSize: 5 * 1024 * 1024 },
})

/** 파일 업로드
 * [single] : html에서 name="image"인 것 을 업로드처리
 **/
app.get('/upload', upload.single('image'), (req, res) => {
   console.log(req.file) // 업로드된 파일 정보 출력
   res.send('파일 업로드 완료')
})


app.listen(app.get('port'), () => {
   console.log(`멀티플 서버가 작동중입니다.\nhttp://localhost:${app.get('port')}
        `)
})
