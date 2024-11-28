const path = require('path')

const filePath = './example.txt'

// 파일 이름과 확장자 추출
const fileName = path.parse(filePath).name
const fileExtension = path.parse(filePath).ext

console.log(`File Name: ${fileName}`)
console.log(`Extension: ${fileExtension}`)
