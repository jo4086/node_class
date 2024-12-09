const Sequelize = require('sequelize')
const Author = require('./author')
const Book = require('./book')
const dotenv = require('dotenv')

const env = process.env.NODE_ENV || 'development'
const config = require('../config/config.json')[env]
const db = {}

dotenv.config()

const sequelize = new Sequelize(config.database, config.username, config.password, config)

// db객체 생성, Sequelize 인스턴스와 모델 저장
db.sequelize = sequelize

// db객체에 Book, Author 모델 추가
db.Book = Book
db.Author = Author

// 모델 초기화 및 데이터베이스와 연결
Book.init(sequelize)
Author.init(sequelize)

// 모델 관계 설정
Book.associate(db)
Author.associate(db)

// db 객체를 모듈로 내보내 다른파일에 사용하게 설정
module.exports = db