// sns-api/routes/user.js

const express = require('express')
const router = express.Router()
const { isLoggedIn } = require('./middlewares')
const User = require('../models/user')
const errorPath = 'sns-api/routes/user.js'

// 사용자를 팔로우하는 라우트
router.post('/:id/follow', isLoggedIn, async (req, res) => {
    try {
        const user = await User.findOne({ where: { id: req.user.id } })
        if (!user) {
            throw new Error('로그인된 사용자의 정보를 데이터베이스에서 찾을 수 없습니다.')
        }

        await user.addFollowing(parseInt(req.params.id, 10))
        res.json({
            success: true,
            message: '사용자를 성공적으로 팔로우 했습니다.',
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            message: '팔로우도중 오류가 발생하였습니다.',
            errorPath,
            error,
        })
    }
})

module.exports = router

/*
const user = await User.findOne({ where: { id: req.user.id } })
if (user) {
    await user.addFollowing(parseInt(req.params.id, 10))
    res.json({
        success: true,
        message: '사용자를 성공적으로 팔로우 했습니다.',
    })
} else {
    res.status(404).json({
        success: false,
        message: '사용자를 찾을 수 없습니다.',
    })
}
*/
