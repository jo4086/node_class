const { URL } = require('url')


// 쿼리 스트링을 다루는 searchParams
const myURL = new URL('http://www.gilbut.co.kr/?page=3&limit=10&category=nodejs&category=javascript')

console.log('searchParams: ', myURL.searchParams)
console.log('')
// 키에 해당하는 모든 값을 가져옴
console.log('searchParams.getAll(): ', myURL.searchParams.getAll('category'))
console.log('')

// 키에 해당하는 첫번째 값만 가져옴
console.log('searchParams.get(): ', myURL.searchParams.get('category'))

console.log('')
// 해당키의 존재 검사
console.log('searchParams.has(): ', myURL.searchParams.has('page'))

console.log('')

// 모든 키를 Iterator 객체로 가져옴
console.log('searchParams.keys(): ', myURL.searchParams.keys())
console.log('')

// 모든 value값을 Iterator 객체로 가져옴
console.log('searchParams.values(): ', myURL.searchParams.values())
console.log('')

// key, value 추가
myURL.searchParams.append('filter', 'es3')
console.log(" ▼ myURL.searchParams.append('filter', 'es3')\n", myURL.searchParams.getAll('filter'))
console.log('')
//키를 제거
myURL.searchParams.delete('filter')
console.log(" ▼ myURL.searchParams.delete('filter')\n", myURL.searchParams.getAll('filter'))
console.log('')

// searchParams객체를 다시 문자열로 해체
console.log(' ▼ searchParmas.toString()\n', myURL.searchParams.toString())
console.log('')