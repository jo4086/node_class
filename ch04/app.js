const express = require('express')
const path = require('path')
const morgan = require('morgan')
const { sequelize } = require('./models') // models/index.js
require('dotenv').config() // env파일을 사용하기 위한 라이브러리

const app = express()
app.set('port', process.env.PORT || 3000)

// 1. 데이터 베이스 연결 설정
sequelize
    .sync({force: false})
    .then(() => { console.log('데이터베이스 연결 성공') })
    .catch((err) => {
        console.error(`데이터베이스 연결 실패: ${err}`)
    })

app.listen(app.get('port'), () => {
   console.log(`서버가 작동 중 입니다. http://localhost:${app.get('port')}`)
})

// 2. 공통 미들웨어 설정(morgan 사용)
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

/** 1. 데이터베이스 연결설정,, sequelize는 프로미스 객체이기에 .then .catch를 사용
 * sequelize
 *      .sync({force: false}) => force: 기존테이블 초기화 여부 / 초기화false / true로할 시 잘못하면 기록한 데이터가 날아가버림
 **/
