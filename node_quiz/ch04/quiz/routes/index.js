const express = require('express')
const router = express.Router()

const Author = require('../models/author')
const Book = require('../models/book')

router.get('/', (req, res, next) => {
    res.status(200).json({message: '작가 ID를 입력하여 해당 작가의 도서를 검색해보세요.'})
})

router
    .get('/:id/books', async (req, res, next) => {
        try {
            const authorId = req.params.id

            const author = await Author.findByPk(authorId)
            if (!author) {
                return res.status(404).json({message: '해당 ID와 일치하는 작가를 찾을 수 없습니다.'})
            }

            const booklist = await Book.findAll({
                where: {AuthorId: authorId}
            })

            res.status(200).json({
                author: {
                    id: author.id,
                    name: author.name,
                    age: author.age,
                },
                books: booklist
            })
        } catch(err) {
            console.error(err)
            next(err)
        }
    })

module.exports = router
