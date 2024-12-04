const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.send('Hello, User')
})

/*
router.get('/test', (req, res) => {
    res.send('Hello, User test')
})
*/

router.get('/:id', (req, res) => {
    console.log(req.params, req.query)
    console.log(req.query.page)
    console.log(req.query.lang)
    res.send('Hello, User ' + req.params.id)
})

router.get('/cate/test', (req,res) => {
    res.send('GET /user/cate/test')
})

router.get('/cate/:id', (req, res) => {
    res.send('GET /user/cate/ ' + req.params.id)
})

module.exports = router // 라우터를 내보낸다.
