setImmediate(()=> {
	console.log('Immediate');
})

setTimeout(()=>{
	console.log('setTimeout');
},0)

Promise.resolve().then(() => console.log('promise'))

process.nextTick(()=>{
	console.log('nextTick');
})

// process.nextTick은 setTimeout이나 setImmediate보다 먼저 실행함.
// Promise 객체는 setTimeout, setImmediate보다 먼저 실행


