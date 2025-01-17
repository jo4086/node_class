const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const { Domain } = require('../models')
const { isLoggedIn, verifyToken } = require('./middlewares')

// 토큰 발급
// localhost:3000/token/get
router.get('/get', isLoggedIn, async (req, res) => {
    try {
        const origin = req.get('origin') // http를 포함한 도메인 주소를 가져옴
        // jwt 토큰 생성
        const token = jwt.sign(
            {
                // 토큰에 포함할 사용자 정보
                id: req.user.id,
                email: req.user.email,
            },
            process.env.JWT_SECRET, // 토큰 서명에 사용할 비밀 키
            {
                expiresIn: '30d', // 토큰 만료 시간 설정: 30일( '30m', = 30분, '1d' = 1일, '1y' = 1년 )
                issuer: 'shopmaxadmin', // 토큰 발급자 정보 설정 (예: 어플리케이션 이름)
            },
        )

        await Domain.Create({
            userId: req.user.id,
            host: origin,
            clientToken: token,
        })

        return res.json({
            success: true,
            message: 'API Key가 발급되었습니다.',
            token,
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            message: '토큰 발급 중 에러가 발생했습니다.',
            error,
        })
    }
})

// DB에 저장된 토큰 가져오기
// localhost:3000/token/read
router.get('/read', isLoggedIn, async (req, res) => {
    try {
        const origin = req.get('origin') // 도메인 가져오기
        const userId = req.user.id

        const domainData = await Domain.findOne({
            where: { userId, host: origin },
        })

        // 토큰이 없으면 에러 발생
        if (!domainData) {
            return res.status(404).json({
                success: false,
                message: 'API Key를 찾을 수 없습니다.',
            })
        }

        return res.json({
            success: true,
            message: 'API Key를 읽어왔습니다.',
            token: domainData.clientToken,
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message: 'API Key를 읽는 중 에러가 발생했습니다.',
            error,
        })
    }
})

// 테스트 토큰
router.get('/test', verifyToken, (req, res) => {
    res.json(req.decoded)
})

module.exports = router
