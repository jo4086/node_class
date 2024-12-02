const fs = require('fs')

console.log('1. 시작')

// 논블로킹 파일 읽기 (I/O 작업)
fs.readFile('readme2.txt', 'utf8', (err, data) => {
   if (err) throw err
   console.log('5. 파일 읽기 완료')
})

// 논블로킹 타이머
setTimeout(() => {
   console.log('4. setTimeout 실행')
}, 0)

// `process.nextTick` (가장 높은 우선순위)
process.nextTick(() => {
   console.log('3. nextTick 실행')
})

console.log('2. 끝')
