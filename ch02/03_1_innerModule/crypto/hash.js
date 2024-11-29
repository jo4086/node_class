// 단방향 암호화 : 복호화 불가능
const crypto = require('crypto')

console.log(crypto.createHash('sha512').update('비밀번호').digest('base64'))
console.log('')
console.log(crypto.createHash('sha512').update('비밀번호').digest('hex'))
console.log('')
console.log(crypto.createHash('sha512').update('다른 비밀번호').digest('base64'))

