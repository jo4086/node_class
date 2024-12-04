const express = require('express')
require('dotenv').config()
const morgan = require('morgan')

const app = express()
app.set('port', process.env.PORT || 3000)

app.use((req, res, next) => {
    // console.log(`req.path: '${req.path}'`)
    // [morgan] : 조건부로 실행시 뒤에 3가지 매개변수를 붙여줘야함
    // [startsWith] : 해당 문자열로 시작하는지 true/false
    if(req.path.startsWith('/api')) {
        morgan('dev')(req, res, next)
    } else {
        next()
    }
})


app.get('/', (req, res) => {
    res.send('welcome to the home!')
})

app.get('/api/user', (req, res) => {
    res.json([
        { id: 1, name: 'John' },
        { id: 2, name: 'Jane' },
    ])
})

app.get('/api/product', (req, res) => {
    res.json([
        { id: 1, name: 'Laptop' },
        { id: 2, name: 'Phone' },
    ])
})

app.listen(app.get('port'), () => {
   console.log(`서버가 작동 중 입니다. http://localhost:${app.get('port')}`)
})
