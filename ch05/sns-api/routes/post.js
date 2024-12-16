const express = require('express')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const { Post, Hashtag, User } = require('../models')
const { isLoggedIn } = require('./middlewares')
const router = express.Router()


// uploads 폴더가 없을 경우 새로 성성
try {
    fs.readdirSync('uploads')
} catch (error) {
    console.log('uploads 폴더가 없습니다. 새로 생성합니다.')
    fs.mkdirSync('uploads') // 폴더 생성
}

const  upload = multer({
    storage: multer.diskStorage({
        destination(req, file, cb) {
            cb(null, 'uploads/') // 업로드 폴더 경로 설정
        },
        filename(req, file, cb) {
            const ext = path.extname(file.originalname) // 확장자 추출
            cb(null, path.basename(file.originalname, ext) + Date.now() + ext) // 파일명 설정
        }
    }),
    limits: { fileSize: 5 * 1024 * 1024 }, // 파일 크기 5MB 제한
})


// '/' 경로의 GET//POST
router
    .route('/')
    .all(isLoggedIn)
    .post(upload.single('img'), async (req, res) => {
        try {
            console.log('파일정보:' ,req.file)

            if(!req.file) {
                return res.status(400).json({
                    success: false,
                    message: '파일 업로드에 실패했습니다.'
                })
            }

            // 게시물 생성
            const post = await Post.create({
                content: req.body.content,
                img: `/${req.file.filename}`, // 이미지 url
                UserId: req.user.id
            })

            // 게시물 내용에서 해시태그 추출,, #으로 시작, [문자의 집합], ^:부정, ,, \s(공백)과# 조건,, *: 앞의 조건이 0번이상 반복,, /g: 글로벌=> 문자열에서 해당 패턴을 모두 서칭
            const hashtags = req.body.hashtags.match(/#[^\s#]*/g) // 정규표현식을 이용하여 #을 구분함

            if (hashtags) {
                const result = await Promise.all(
                    hashtags.map((tag) => hashtags.findOrCreate({ where: { titie: tag.slice(1) } }))
                )

                // posthashtag 관계 테이블에 연결 추가
                await post.addHashtags(result.map((r) => r[0])) // 해스태그 연결
            }

            res.json({
                success: true,
                post: {
                    id: post.id,
                    content: post.content,
                    img: post.img,
                    UserId: post.UserId
                },
                messaege: '게시물이 성공적으로 둥록되었습니다.'
            })
        } catch (error) {
            console.error(error)
            res.status(500).json({
                success: false,
                message: '게시물 등록 중 오류가 발생했습니다.',
                error
            })
        }
    })
    // .get(async (req, res) = {})

const postData = async (req, res, next) => {
    try {
        const exPost = await Post.findOne(
            {
                where: {
                    id: req.params.id,
                    UserId: req.user.id
                }
            })
        if (!post) {
            return res.status(404).json({
                success: false,
                message: '게시물을 찾을 수 없습니다.'
            })
        }
        req.post = exPost
        next()
    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            message: '게시물 처리중 오류가 발생하였습니다.',
            error
        })
    }
}


// '/:id' 경로의 GET // UPDATE // DELETE

router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findOne({
            where: { id: req.params.id },
            include: [
                {
                    model: User,
                    attributes: ['id', 'nick', 'email'],
                },
                {
                    model: Hashtag,
                    attributes: ['title']
                }
            ]
        })

        if (!post) {
            return res.status(404).json({
                success: false,
                message: '게시물을 찾을 수 없습니다.'
            })
        }

        res.json({
            success: true,
            post,
            message: '게시물을 성공적으로 불러왔습니다.'
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            message: '게시물을 불러오는 중 오류가 발생하였습니다.',
            error,
        })
    }
})

router
    .route('/:id')
    .all(isLoggedIn, postData)
    .put(upload.single('img'), async (req, res) => {
        try {
            const post = req.post

            // 1. 게시물 수정
            await post.update({
                content: req.body.content,
                img: req.file ? `/${req.file.filename}` : post.img,
            })

            // 2. 게시물에서 해시태그 추출
            const hashtags = req.body.hashtags.match(/#[^\s#]*/g)
            let result = []
            if (hashtags) {
                result = await Promise.all(
                    hashtags.map((tag) => Hashtag.findOrCreate({
                        where: { title: tag.slice(1).toLowerCase()}
                    }))
                )
            }

            // 3. posthashtag 관계 테이블 업데이트 (기존 연결 해제후 새로운 연결 추가)
            await post.setHashtags(result.map((r) => r[0]))

            // 4. 게시물 재 조회 (include 추가)
            const updatedPost = await Post.findOne({
                where: { id: req.params.id },
                include: [
                    {
                        model: User,
                        attributes: ['id', 'nick', 'email'] // User의 특정 필드만 GET!!
                    },
                    {
                        model: Hashtag,
                        attributes: ['title'], // Hashtag의 title만 GET!!
                    }
                ]
            })

            res.json({
                success: true,
                post: updatedPost,
                message: '게시물이 성공적으로 수정되었습니다.'
            })

        } catch (error) {
            console.error(error)
            res.status(500).json({
                success: false,
                message: '게시물 수정 중 오류가 발생하였습니다.',
                error
            })
        }
    })
    .delete(async (req, res) => {
         try {
            const post = req.post

            await post.destroy()

            res.json({
                success: true,
                message: '게시물이 성공적으로 삭제되었습니다.'
            })

        } catch (error) {
            console.error(error)
            res.status(500).json({
                success: false,
                message: '게시물 삭제 중 오류가 발생하였습니다.',
                error
            })
        }
    })


module.exports = router
