const express = require('express')
const { Book, Author } = require('../models')

const router = express.Router()
/*
    GET /books
    POST /books
    PATCH /books/:id
    DELETE /books/:id
*/

router.get('/', async (req, res, next) => {
   try {
      const books = await Book.findAll({ include: Author })
      res.json(books)
   } catch (err) {
      console.error(err)
      next(err)
   }
})

router.post('/', async (req, res, next) => {
   try {
      const book = await Book.create(req.body)
      res.status(201).json(book)
   } catch (err) {
      console.error(err)
      next(err)
   }
})

router.patch('/:id', async (req, res, next) => {
   try {
      const result = await Book.update(req.body, { where: { id: req.params.id } })
      if (result[0] === 0) return res.status(404).json({ message: 'Book not found' })
      res.json({ message: 'Book updated successfully' })
   } catch (err) {
      console.error(err)
      next(err)
   }
})

router.delete('/:id', async (req, res, next) => {
   try {
      const result = await Book.destroy({ where: { id: req.params.id } })
      if (result === 0) return res.status(404).json({ message: 'Book not found' })
      res.json({ message: 'Book deleted successfully' })
   } catch (err) {
      console.error(err)
      next(err)
   }
})

module.exports = router
