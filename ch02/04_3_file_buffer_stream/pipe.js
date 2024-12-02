// 파일 스트림을 사용해 파일 복사

const fs = require('fs')

// 'readme4.txt' 파일을 읽기 위한 읽기 스트림 생성
const readStream = fs.createReadStream('readme4.txt')

// 'writeme3.txt' 파일에 데이터를 씨기 위한 스트림 생성
const writeStream = fs.createWriteStream('writeme3.txt')

// 읽기 스트림의 데이터 => 쓰기 스트림으로 연결 (파이프처리)
// 'readme4.txt'의 내용이 'writeme3.txt'로 복사

readStream.pipe(writeStream)
