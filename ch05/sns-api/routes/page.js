// sns-api/routes/page.js
// 프로필 조회 route

const express = require('express')
const router = express.Router()
const { isLoggedIn } = require('./middlewares')
const { User, Hashtag } = require('../models')

// 1. 내 프로필 조회
router.get('/profile', isLoggedIn, async (req, res) => {
    res.json({
        success: true,
        user: req.user,
        message: '프로필 정보를 조회에 성공하였습니다.'
    })
})


// 2. 특정인 프로필 조회
router.get('/profile/:id', isLoggedIn, async (req, res) => {
    try {
        const userId = req.params.id // 사용자 id
        const user = await User.findOne({
            where: { id: userId }, // 조회하는 User의 5가지 컬럼을 가져옴
            attributes: ['id', 'nick', 'email', 'createdAt', 'updatedAt'],
            include: [
                {
                    model: User,
                    as: 'Followers', // 나를 팔로워하는 사람들
                    attributes: ['id', 'nick', 'email'], // 해당 사람들의 3가지 컬럼
                },
                {
                    model: User,
                    as: 'Followings', // 내가 팔로잉하는 사람들
                    attributes: ['id', 'nick', 'email'], // 해당 사람들의 3가지 컬럼
                }
            ]
        })

        if (!user) {
            return res.status(404).json({
                success: false,
                message: '사용자를 찾을 수 없습니다.'
            })
        }

        res.json({
            success: true,
            message: '팔로우 정보를 성공적으로 조회하였습니다.',
            user,
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            message: '팔로우 정보를 조회하는데 오류가 발생하였습니다.',
            error
        })
    }
})

module.exports = router
