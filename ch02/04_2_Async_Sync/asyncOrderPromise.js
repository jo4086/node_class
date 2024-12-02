const fs = require('fs').promises

// 콜백지옥 -> promise로 해결하기

console.log('')
console.log('시작')
console.log('')

fs.readFile('./readme2.txt')
   .then((data) => {
      console.log('1번', data.toString())
      return fs.readFile('./readme2.txt')
   })
   .then((data) => {
      console.log('2번', data.toString())
      return fs.readFile('./readme2.txt')
   })
   .then((data) => {
      console.log('3번', data.toString())
      console.log('끝')
   })
   .catch((err) => {
      console.error(err)
   })
