const os = require('os')

console.log('')
console.log('┣━━━━━━━━ 운영체제 정보 ━━━━━━━━')

console.log(' ▼ [os.arch()] \n' + ' └─: ' + os.arch())
console.log(' ▼ [os.platform()] \n' + ' └─: ' + os.platform())
console.log(' ▼ [os.type()] \n' + ' └─: ' + os.type())

// 부팅 이후 부른시간
console.log('')
console.log('┣━━━━━━━━ 부팅 시간 ━━━━━━━━')
console.log(' ▼ [os.uptime()] \n' + ' └─: ' + os.uptime() + ' 초')
console.log(' ▼ [os.hostname()] \n' + ' └─: ' + os.hostname()) //

console.log('')
console.log('┣━━━━━━━━ 운영체제 버전 ━━━━━━━━')
console.log(' ▼ [os.release()] \n' + ' └─: ' + os.release())

console.log('')
console.log('┣━━━━━━━━ 경로 ━━━━━━━━')

//홈 디렉토리 경로
console.log(' ▼ [os.homedir()]\n' + ' └─: ' + os.homedir())

//임시파일 저장 경로
console.log(' ▼ [os.tmpdir()]\n' + ' └─: ' + os.tmpdir())

console.log('')
console.log('┣━━━━━━━━ cpu ━━━━━━━━')

//컴퓨터의 코어 정보
console.log(' ▼ [os.cpus()]\n' + ' └─: ' + os.cpus())
console.log(' ▼ [os.cpus().length] - 코어수\n' + ' └─: ' + os.cpus().length + ' 개')

console.log('')
console.log('┣━━━━━━━━ 메모리 ━━━━━━━━')

//사용가능한 메모리(RAM)을 보여줌
console.log(' ▼ [os.freemem()]\n' + ' └─: ' + os.freemem() + ' byte')
console.log(' ▼ [os.freemem()] (MB) \n' + ' └─: ' + (os.freemem() / 1024 / 1024).toFixed(2) + ' MB')

//전체 메모리(RAM) 용량
console.log(' ▼ [os.totalmem()]\n' + ' └─: ' + os.totalmem() + ' byte')
console.log(' ▼ [os.totalmem()] (MB) \n' + ' └─: ' + (os.totalmem() / 1024 / 1024).toFixed(2) + ' MB')
