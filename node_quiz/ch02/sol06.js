// 1. setImmediate: "Immediate task started"를 즉시 출력
setImmediate(() => {
   console.log('Immediate task started')
})

// 2. setInterval: 1초마다 "Tick"을 출력, 5번 출력 후 멈춤
let count = 0
const interval = setInterval(() => {
   console.log('Tick')
   count++
   if (count === 5) {
      clearInterval(interval) // setInterval 중지
   }
}, 1000)

// 3. setTimeout: 6초 후 "All tasks done!" 출력
setTimeout(() => {
   console.log('All tasks done!')
}, 6000)
