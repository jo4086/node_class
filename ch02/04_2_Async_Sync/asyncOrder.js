const fs = require('fs')

// 비동기로 하며 순서 유지방법

console.log('시작')

// 논 블로킹 (프로세스 멈추지 않음), 비동기 (콜백함수)
fs.readFile('./readme2.txt', (err, data) => {
	if (err) {
		throw err
	}
	console.log('1번', data.toString())
	// 논블로킹 (프로세스 멈추지 않음), 비동기 (콜백함수)
	fs.readFile('./readme2.txt', (err, data) => {
		if (err) {
			throw err
		}
		console.log('2번', data.toString())
		//논 블로킹 (프로세스 멈추지 않음), 비동기 (콜백함수)
		fs.readFile('./readme2.txt', (err, data) => {
			if (err) {
				throw err
			}
			console.log('3번', data.toString())
			console.log('끝')
		})
	})
})
