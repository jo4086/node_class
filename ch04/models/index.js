const Sequelize = require('sequelize')

// model Import하기
const User = require('./user')
const Comment = require('./comment')

const Country = require('./Country')
const Capital = require('./Capital')

const dotenv = require('dotenv')

// .env에서 현재 실행환경(development, test, production)을 가져옴
const env = process.env.NODE_ENV || 'development'

// 가져온 실행환경에 맞는 db설정을 가져옴
const config = require('../config/config')[env]
const db = {}
dotenv.config()

// sequelize를 사용해 데이터베이스를 연결
const sequelize = new Sequelize(config.database, config.username, config.password, config)

// db객체를 생성하여 sequelize 객체와 모든 모델들을 저장
db.sequelize = sequelize

// [User, Comment] 모델과 [Country, Capital] 모델을 db 객체에 추가
db.User = User
db.Comment = Comment

db.Country = Country
db.Capital = Capital

// 모델을 초기화하고 데이터베이스와 연결
User.init(sequelize)
Comment.init(sequelize)

Country.init(sequelize)
Capital.init(sequelize)

// 모델간의 관계 설정(ex. 외래키, 연관테이블 등)
User.associate(db)
Comment.associate(db)

Country.associate(db)
Capital.associate(db)

// db 객체를 모듈로 내보냄
module.exports = db

/** [const config]
 * config.json을 참조하며 [env]로 인해 KEY명이 'development'인것이 연결된다.
 * config = development객체
 *
 * config.
 *    username
 *    password
 *    database
 *    host
 *    dialect
 * 로 가져올 수 있다.
 */

/* 
{
   "development": {
      "username": "root",
      "password": "1234",
      "database": "test",
      "host": "127.0.0.1",
      "dialect": "mysql"
   },
   "test": {
      "username": "root",
      "password": "",
      "database": "",
      "host": "127.0.0.1",
      "dialect": "mysql"
   },
   "production": {
      "username": "root",
      "password": "",
      "database": "",
      "host": "127.0.0.1",
      "dialect": "mysql"
   }
}
*/

// data['development']
