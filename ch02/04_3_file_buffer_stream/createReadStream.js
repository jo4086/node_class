// 파일 스트림을 사용해 파일을 읽는 예제.

const fs = require('fs')

// 'readme3.txt' 파일을 읽기 위한 스트림 생성
// highWaterMark 옵션으로 1회 읽을 버퍼 크기를 16byte로 설정
const readStream = fs.createReadStream('./readme3.txt', { highWaterMark: 16 })

// 읽어들인 데이터를 저장할 배열 초기화
const data = []

// 'data' 이벤트: 스트림에서 데이터(chunk)가 들어올 떄 마다 발생
readStream.on('data', (chunk) => {
   // 들어온 데이터를 배열에 추가
   data.push(chunk)
   // 각 데이터(chunk)와 그 길이를 출력
   console.log('data: ', chunk, chunk.length)
})

// 'end' 이벤트: 스트림의 읽기가 끝났을 때 발생
readStream.on('end', () => {
   // 저장된 데이터를 합쳐서 문자열로 변환 후 출력
   console.log('end :', Buffer.concat(data).toString())
})

// 'error' 이벤트 : 스트림에서 에러가 발생했을 때 발생
readStream.on('error', (err) => {
   console.log('error :', err) // 에러 내용 출력
})

/** 출력 결과
 * data:  <Buffer ec a0 80 eb 8a 94 20 ec a1 b0 ea b8 88 ec 94 a9> 16
 * data:  <Buffer 20 ec a1 b0 ea b8 88 ec 94 a9 20 eb 82 98 eb 88> 16
 * data:  <Buffer a0 ec 84 9c 20 ec a0 84 eb 8b ac eb 90 a9 eb 8b> 16
 * data:  <Buffer 88 eb 8b a4 2e 20 eb 82 98 eb 88 a0 ec a7 84 20> 16
 * data:  <Buffer ec a1 b0 ea b0 81 ec 9d 84 20 63 68 75 6e 6b eb> 16
 * data:  <Buffer 9d bc ea b3 a0 20 eb b6 80 eb a6 85 eb 8b 88 eb> 16
 * data:  <Buffer 8b a4 2e 0a 0a> 5
 * end : 저는 조금씩 조금씩 나눠서 전달됩니다. 나눠진 조각을 chunk라고 부릅니다.
 **/
