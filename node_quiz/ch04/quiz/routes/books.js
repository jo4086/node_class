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
         let author

         // 1. 작가 ID가 입력 될 경우 1순위로 검색
         if (req.body.id) {
            author = await Author.findByPk(req.body.id)
            if (!author) {
               return res.status(404).json({ message: '일치하는 작가 ID를 찾을 수 없습니다.' })
            }

            if (req.body.name && author.name !== req.body.name) {
               const authors = await Author.findAll({
                  // 여기서는 id, name, age로 작가를 구분했지만 실제에서는 나이는 민감한 정보이기에 소속사, 국가, 학력, 대표서적, 수상경력 등으로 구분시킬 수 있게 해야 할 것.
                  where: { name: req.body.name },
               })
               return res.status(400).json({
                  message: 'ID와 작가명이 일치하지 않습니다.',
                  '사용자가 검색한 이름': req.body.name,
                  'ID에 저장된 이름': author.name,
                  '입력한 이름으로 검색된 ID 목록': authors,
               })
            }
            // 2. 작가명과 작가 나이를 같이 검색 할 경우
         } else if (req.body.name && req.body.age) {
            const authors = await Author.findAll({
               where: {
                  name: req.body.name,
                  age: req.body.age,
               },
            })
            if (authors.length === 0) {
               return res.status(404).json({ message: '이름과 나이가 일치하는 작가를 찾을 수 없습니다.' })
            } else if (authors.length === 1) {
               // 검색한 조건의 작가가 1명일 경우
               author = authors[0]
            } else {
               // 검색한 조건의 작가가 여러명일 경우
               return res.status(300).json({
                  message: '일치하는 작가가 여러 명 있습니다. ID와 나이를 참고해 다시 입력해주세요.',
                  authors: authors.map((author) => ({
                     id: author.id,
                     name: author.name,
                     age: author.age,
                  })),
               })
            }
            // 3. 작가명만 검색 할 경우
         } else if (req.body.name) {
            const authors = await Author.findAll({
               where: { name: req.body.name },
            })

            if (authors.length === 0) {
               return res.status(404).json({ message: '일치하는 작가를 찾을 수 없습니다.' })
            } else if (authors.length === 1) {
               // 작가가 1명일 경우 해당 작가 정보 사용
               author = authors[0]
            } else {
               // 작가가 여러명일 경우 여러 작가의 정보 반환
               // status(300) : 요청한 응답에 대해 여러 선택 사항이 존재함을 알려주는 코드
               return res.status(300).json({
                  message: '일치하는 작가가 여러 명 있습니다. ID와 나이를 참고해 다시 입력해주세요.',
                  authors: authors.map((author) => ({
                     id: author.id,
                     name: author.name,
                     age: author.age,
                  })),
               })
            }
            // 4. 데이터를 입력하지 않은 경우
            // status(400): 유효하지 않은 리퀘스트 상태값
         } else {
            return res.status(400).json({ message: '작가ID 또는 작가명(나이는 선택사항)을 입력하세요.' })
         }

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

router
   .route('/:id')
   .get(async (req, res, next) => {
      try {
         const book = await Book.findByPk(req.params.id)

         if (!book) {
            return res.status(404).json({
               message: '일치하는 책 ID가 존재하지 않습니다.',
            })
         }
         res.status(200).json(book)
      } catch (err) {
         console.error(err)
         next(err)
      }
   })
   .patch(async (req, res, next) => {
      try {
         const isBook = await Book.findByPk(req.params.id)
         if (!isBook) {
            return res.status(404).json({ message: '해당 ID는 존재하지 않습니다.' })
         }

         const result = await Book.update(
            {
               title: req.body.title,
               genre: req.body.genre,
               AuthorId: req.body.AuthorId,
            },
            {
               where: { id: req.params.id },
            },
         )
         if (result[0] === 0) {
            return res.status(200).json({ message: '수정된 내용이 없습니다.' })
         }
         res.status(200).json({ message: '책 정보를 수정하였습니다.', result })
      } catch (err) {
         console.error(err)
         next(err)
      }
   })
   .delete(async (req, res, next) => {
      try {
         const result = await Book.destroy({
            where: { id: req.params.id },
         })
         if (result === 0) {
            return res.status(404).json({ message: '책 정보가 존재하지 않습니다.' })
         }
         res.status(200).json({ message: '책 정보가 삭제되었습니다.', result })
      } catch (err) {
         console.error(err)
         next(err)
      }
   })

module.exports = router
