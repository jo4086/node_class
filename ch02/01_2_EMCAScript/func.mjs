import { odd, even }  from './ment.mjs' // require 함수에 불러올 모듈의 경로 작성

// 짝수 홀수 판단
function checkOddOrEven(num) {
	if (num % 2 === 0) {
		return even
	} else {
		return odd
	}
}

// 함수를 모듈로 만들어 외부로 내보냄
export default checkOddOrEven

