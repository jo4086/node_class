const fs = require('fs')

// fs.writeFile('./writeme.txt', '글이 입력됩니다.', (err) => {
// 	if (err) {
// 	   console.error('존재하지 않는 파일입니다.')
//       throw err
//    }
//    fs.readFile('./writeme.txt', (err, data) => {
//       if (err) {
//          throw err
//       }
//       console.log(data.toString())
//    })
// })

fs.writeFile('./writeme2.txt', '글이 입력됩니다.', (err) => {
   if (err) {
      console.error('존재하지 않는 파일입니다.')
      throw err
   }
   fs.readFile('./writeme2.txt', (err, data) => {
      if (err) {
         throw err
      }
      console.log(data.toString())
   })
})
