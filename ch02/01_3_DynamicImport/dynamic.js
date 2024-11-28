// console.log('Node.js 모듈 경로:', module.paths)
const a = true

// dynamic import : 특정 조건일 때 require
// commonJS 모듈 방식일 때 문제 없음,,,
// BUT EM모듈에서 문제가 있음

// if (a) {
//    require('./func')
// }
if (a) {
   const checkOddOrEven = require('./func') // `func.js` 모듈을 가져와 변수에 할당
   console.log(checkOddOrEven(2)) // "홀수 입니다." 출력
}


console.log('성공')
