const fs = require('fs')

function copyFile(src, dest) {
   fs.copyFile(src, dest, (err) => {
      if (err) {
         console.error(`Error copying file: ${err.message}`)
      } else {
         console.log('파일 복사가 성공적으로 완료되었습니다!')
      }
   })
}

copyFile('example.txt', 'example-copy.txt')
