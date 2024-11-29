const url = require('url') // 인터넷 주소를 쉽게 조작하게함

const { URL } = url
const myURL = new URL('https://www.naver.com/')
// 주소를 객체로 분해
console.log('new URL(): ', myURL)
// 분해된 주소를 다시 합침
console.log('url.format(): ', foramt(myURL))
