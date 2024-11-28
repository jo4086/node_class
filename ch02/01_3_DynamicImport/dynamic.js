const a = false

// dynamic import : 특정 조건일 때 require
// commonJS 모듈 방식일 때 문제 없음,,,
// BUT EM모듈에서 문제가 있음

if (a) {
	require('./func')
}

console.log('성공')
