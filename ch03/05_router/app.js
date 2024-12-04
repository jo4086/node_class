const express = require('express')
const morgan = require('morgan')
require('dotenv').config()

const indexRouter = require('./routes')
const userRouter = require('./routes/user')

const app = express()
app.set('port', process.env.PORT || 3000)
app.use(morgan('dev')) // 로그 남기기



app.use('/', indexRouter) // localhost:8000/
app.use('/user', userRouter) // localhost:8000/user

app.use((req, res, next) => {
    res.status(404).send('Not Found')
})

app.listen(app.get('port'), () => {
    console.log(`서버가 작동중입니다.\nhttp://localhost:${app.get('port')}`)
})
