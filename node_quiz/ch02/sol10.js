const queryString = '?query=JavaScript&page=2'

// URLSearchParams로 쿼리 값 추출
const params = new URLSearchParams(queryString)

console.log(`Query: ${params.get('query')}`)
console.log(`Page: ${params.get('page')}`)
