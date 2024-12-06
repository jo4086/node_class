const express = require('express')
const { Author, Book } = require('../models')

const router = express.Router()

// 특정 저자와 그 저자가 쓴 책을 모두 가져오기
router.get('/:id/books', async (req, res, next) => {
   try {
      const authorWithBooks = await Author.findOne({
         where: { id: req.params.id }, // 특정 저자의 ID로 조회
         include: {
            model: Book, // Book 모델과 연관된 데이터 포함
         },
      })

      if (!authorWithBooks) {
         return res.status(404).json({ message: 'Author not found' })
      }

      res.json(authorWithBooks) // 저자와 책 데이터를 JSON으로 응답
   } catch (err) {
      console.error(err)
      next(err)
   }
})

module.exports = router
