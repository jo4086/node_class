const os = require('os')

// 총 메모리와 사용 가능한 메모리 (GB 단위로 변환)
const totalMemory = (os.totalmem() / 1e9).toFixed(2) // GB
const freeMemory = (os.freemem() / 1e9).toFixed(2) // GB

console.log(`Total Memory: ${totalMemory} GB`)
console.log(`Free Memory: ${freeMemory} GB`)
