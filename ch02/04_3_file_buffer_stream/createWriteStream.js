// 파일 스트림을 사용해서 쓰는 예제

const fs = require('fs')

const writeStream = fs.createWriteStream('./writeme2.txt')

// 'finish'이벤트 : 쓰기 스트림이 종료 될 때 발생

writeStream.on('finish', () => {
    console.log('파일 쓰기 완료')
})

// 스트림에 데이터 작성
writeStream.write('이 글을 씁니다.\n') // 첫 번째 데이터 작성
writeStream.write('1번 더 씁니다.') // 두 번째 데이터 작성

// 스트림 종료
writeStream.end()
