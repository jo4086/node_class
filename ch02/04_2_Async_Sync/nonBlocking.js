const fs = require('fs')

console.log('1. 파일 읽기 시작')

// 한글 비동기 방식: readFile은 논블로킹으로 실행됨
fs.readFile('readme2.txt', 'utf8', (err, data) => {
   if (err) {
      console.error('파일 읽기 실패:', err)
      return
   }
   console.log('3. 파일 내용:', data)
})

console.log('2. 파일 읽기 요청 완료')
