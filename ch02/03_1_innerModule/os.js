const os = require('os')

console.log('운영체제 정보-----------------')
console.log('os.arch(): ', os.arch()) // )
console.log('os.platform(): ', os.platform())
console.log('os.type(): ', os.type())
console.log('os.uptime: ', os.uptime) // 부팅 이후 후른시간
console.log('os.hostname() :', os.hostname()) // 
console.log('os.release(): ', os.release()) // 운영체제 버전

console.log('경로--------')
console.log(os.homedier()) // 홈 디렉토리 연결
console.log(os.tmpdir()) // 임시파일 저장 경로

console.log(os. cpus()) // 컴퓨터의 cpu 경로
console.log(os. cpus().legnth)

console.log('메모리 정보--------------------')
console.log(os.freemem()) // 사용 가능한 RAM 메모리 용량






