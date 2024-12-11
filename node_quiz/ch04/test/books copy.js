const express = require('express')
const router = express.Router()
const Book = require('../models/book')
const Author = require('../models/author')

router
   .route('/')
   .get(async (req, res, next) => {
      try {
         const books = await Book.findAll()
         res.status(200).json(books)
      } catch (err) {
         console.error(err)
         next(err)
      }
   })
   .post(async (req, res, next) => {
      try {
         const author = await Author.findOne({
            where: {
               name: req.body.name,
               age: req.body.age,
            },
         })
         if (!author) {
            return res.status(404).json({ message: '이름과 나이가 일치하는 작가를 찾을 수 없습니다.' })
         }
         console.log('req.body: ', req.body)
         const book = await Book.create({
            title: req.body.title,
            genre: req.body.genre,
            AuthorId: author.id,
         })
         console.log(book)
         res.status(201).json(book)
      } catch (err) {
         console.error(err)
         next(err)
      }
   })
