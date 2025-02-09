const crypto = require('crypto')

const algorithm = 'aes-256-cbc'
const key = 'abcdefghijklmnopqrstuvwxyz123456'
const iv = '1234567890123456'

// 암호화
const cipher = crypto.createCipheriv(algorithm, key, iv)
let result = cipher.update('암호화할 문장', 'utf-8', 'base64')
result += cipher.final('base64')
console.log(' ▼ 암호화\n' + result)
console.log('')

// 복호화
const decipher = crypto.createDecipheriv(algorithm, key, iv)
let result2 = decipher.update(result, 'base64', 'utf-8')
result2 += decipher.final('utf-8')
console.log(' ▼ 복호화\n' + result2)

// Node.js에서 utf-8, utf8 둘 다 사용가능하게 설계되어있음