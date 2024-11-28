// ES 모듈 방식으로 stringUtils.js의 함수 가져오기
import { toUpperCase } from './stringUtils.js'

const input = 'hello world'
const result = toUpperCase(input)
console.log(result) // "HELLO WORLD"
