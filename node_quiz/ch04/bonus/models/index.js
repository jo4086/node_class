const Sequelize = require('sequelize')
const dotenv = require('dotenv')

const Customer = require('./customer')
const Order = require('./order')

const env = process.env.NODE_ENV || 'development'
const config = require('../config/config.json')[env]

const db = {}

dotenv.config()

const sequelize = new Sequelize(config.database, config.username, config.password, config)

// db 객체 생성, Sequelize 인스턴스-모델 저장
db.sequelize = sequelize

// db 객체에 Customer, Order 모델 추가
db.Customer = Customer
db.Order = Order

// 모델 초기화 및 데이터베이스 연결
Customer.init(sequelize)
Order.init(sequelize)

// 모델 관계 설정
Customer.associate(db)
Order.associate(db)

// db 객체를 모듈로 내보내기
module.exports = db
