const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
   res.send('게시물 상세페이지')
})

// router.get('/:num', (req, res) => {
//   if (req.query.search) {
//     if (Number(req.params.num)) {
//       res.send(`게시물 번호: ${req.params.num}<br>${req.query.search}`)
//     }
//   } else {
//     res.send('잘못된 경로입니다.')
//   }
// })

// router.get('/:num', (req, res) => {
//    if (req.query.search && Number(req.params.num)) {
//       res.send(`게시물 번호: ${req.params.num}<br>${req.query.search}`)
//    } else {
//       res.send(`잘못된 경로입니다.`)
//    }
// })

// router.get('/:num', (req, res) => {
//    if (req.query.search && Number(req.params.num)) {
//       res.send(`게시물 번호: ${req.params.num}<br>${req.query.search}`)
//    } else if (!req.query.search && !Number(req.params.num)) {
//       res.send('검색쿼리 및 페이지가 잘못되었습니다.')
//    } else {
//       !req.query.search ? res.send('검색쿼리가 잘못되었습니다.') : res.send('검색 페이지가 잘못되었습니다.')
//    }
// })

router.get('/:num', (req, res) => {
   const isParams = Number(req.params.num)
   const isQuery = Boolean(req.query.search)

   if (isParams && isQuery) {
      return res.send(`게시물 번호: ${req.params.num}<br>${req.query.search}`)
   }

   const errors = []
   if (!isParams) errors.push('검색 페이지가 잘못되었습니다.')
   if (!isQuery) errors.push('검색 쿼리가 잘못되었습니다.')

   res.status(400).send(`${errors.join('<br>')}`)
})

module.exports = router
