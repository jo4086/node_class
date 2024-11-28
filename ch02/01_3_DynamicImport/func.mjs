import { odd, even } from './ment.mjs'

function checkOddOrEven(num) {
   if (num % 2 === 0) {
      return even
   } else {
      return odd
   }
}

export default checkOddOrEven
