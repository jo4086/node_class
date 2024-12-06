const express = require('express')
const { Author } = require('../models')

const router = express.Router()
/*
    GET /authors
    POST /authors
    PATCH /authors/:id
    DELETE /authors/:id 
*/
router.get('/', async (req, res, next) => {
   try {
      const authors = await Author.findAll()
      res.json(authors)
   } catch (err) {
      console.error(err)
      next(err)
   }
})

router.post('/', async (req, res, next) => {
   try {
      const author = await Author.create({
         name: req.body.name, // 클라이언트에서 받은 name
         age: req.body.age, // 클라이언트에서 받은 age
      })
      res.status(201).json(author)
   } catch (err) {
      console.error(err)
      next(err)
   }
})

router.patch('/:id', async (req, res, next) => {
   try {
      const result = await Author.update(req.body, { where: { id: req.params.id } })
      if (result[0] === 0) return res.status(404).json({ message: 'Author not found' })
      res.json({ message: 'Author updated successfully' })
   } catch (err) {
      console.error(err)
      next(err)
   }
})

router.delete('/:id', async (req, res, next) => {
   try {
      const result = await Author.destroy({ where: { id: req.params.id } })
      if (result === 0) return res.status(404).json({ message: 'Author not found' })
      res.json({ message: 'Author deleted successfully' })
   } catch (err) {
      console.error(err)
      next(err)
   }
})

module.exports = router
