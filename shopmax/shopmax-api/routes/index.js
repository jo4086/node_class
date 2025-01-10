const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
    try {
        res.json({success: true, message: '환영합니다'})
    } catch (error) {
        console.error(error)
    }
})

module.exports = router
