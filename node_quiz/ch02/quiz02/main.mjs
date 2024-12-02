// stringUtils.js에서 내보낸 toUpperCase()를 가져와 아래 코드를 완성하세요.

// ECMA스크립트 방식
import { toUpperCase2 } from './stringUtils.mjs'

import toUpperCase from './stringUtils.mjs'

const input1 = 'hello world / Function ~ export default ~'
const input2 = 'hello world / export Function'

const result = toUpperCase(input1)
const result2 = toUpperCase2(input2)

console.log(result) // 결과는 "HELLO WORLD"가 되어야 합니다.
console.log(result2) // 결과는 "HELLO WORLD"가 되어야 합니다.
