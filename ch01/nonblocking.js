function longRunningTask() {
	// 오래 걸리는 작업
	console.log('첫번째 코드 실행시작')
	console.log('첫번째 코드 작업끝')
}

console.log('전체 코드 시작')
setTimeout(longRunningTask,0)
console.log('두번째 코드 실행시작')
