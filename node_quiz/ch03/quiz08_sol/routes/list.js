const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
   res.send('게시판 입니다.')
})

module.exports = router
