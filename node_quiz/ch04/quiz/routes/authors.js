const express = require('express')
const router = express.Router()
const Author = require('../models/author')
// const Book = require('../models/book')

router
    .route('/')
    .get(async (req, res, next) => {
        try {
            const authors = await Author.findAll()
            res.status(200).json(authors)
        } catch (err) {
            console.error(err)
            next(err)
        }
    })
    .post(async (req, res, next) => {
        try {
            
            if (!req.body.name || !req.body.age) {
                return res.status(400).json({
                    message: '이름과 나이 필수입니다. 다시 입력해주세요'
                })
            }
            
            console.log('req.body: ', req.body)
            const author = await Author.create({
                name: req.body.name,
                age: req.body.age,
            })
            console.log(author)
            res.status(201).json(author)
        } catch (err) {
            console.error(err)
            next(err)
        }
    })

router
    .route('/:id')
    .get(async (req, res, next) => {
        try{
            const author = await Author.findByPk(req.params.id)
            if (!author) {
                return res.status(404).json({message: '작가 ID가 존재하지 않습니다.'})
            }
            res.status(200).json(author)
        } catch (err) {
            console.error(err)
            next(err)
        }
    })
    .patch(async (req, res, next) => {
        try {
            const result = await Author.update(
                {
                    name: req.body.name,
                    age: req.body.age
                },
                {
                    where: { id: req.params.id },
                },
            )
            if (result[0] === 0) {
                return res.status(404).json({ message: '작가를 찾을 수 없습니다.' })
            }
            res.status(200).json({ message: '작가정보가 수정되었습니다.', result })
        } catch(err) {
            console.error(err)
            next(err)
        }
    })
    .delete(async (req, res, next) => {
        try {
            const result = await Author.destroy({
                where: {id: req.params.id},
            })
            if (result === 0) {
                return res.status(404).json({ message: '작가 정보가 존재하지 않습니다.' })
            }
            res.status(200).json({ message: '작가 정보가 삭제되었습니다.', result })
        } catch(err) {
            console.error(err)
            next(err)
        }
    })

module.exports = router