// 1. setImmediate: "Immediate task started"를 즉시 출력
setImmediate(() => {})

// 2. setInterval: 1초마다 "Tick"을 출력, 5번 출력 후 멈춤
let count = 0
const interval = setInterval(() => {}, 1000)

// 3. setTimeout: 6초 후 "All tasks done!" 출력
setTimeout(() => {}, 6000)
