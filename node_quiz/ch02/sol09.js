const url = require('url')

const website = 'https://www.example.com/path?query=123'

// URL 파싱 후 호스트 이름 추출
const parsedUrl = new url.URL(website)

console.log(`Host: ${parsedUrl.host}`)
