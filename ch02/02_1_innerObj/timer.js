/**/

const timeout = setTimeout(() => {
	console.log('1초 후 실행\n');
},1000)

const interval = setInterval(() => {
	// console.log('1초마다 실행');
	console.count('1초간격 반복횟수');
},1000)

// const timeout2 = setTimeout(() => {
// 	console.log('실행되지 않습니다.');
// },3000)


setImmediate(() => {
	console.count('immediate');
},7000)

setTimeout(() => {
	clearTimeout(timeout);
	clearInterval(interval);
}, 7000)





//setTimeout(() => {
//       clearTimeout(timeout2);
//	clearInterval(interval);
//},2500);

