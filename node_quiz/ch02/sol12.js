const fs = require('fs')

function copyFileWithStreams(srcPath, destPath) {
   const readStream = fs.createReadStream(srcPath)
   const writeStream = fs.createWriteStream(destPath)

   readStream.pipe(writeStream)

   readStream.on('error', (err) => {
      console.error(`Error reading file: ${err.message}`)
   })

   writeStream.on('error', (err) => {
      console.error(`Error writing file: ${err.message}`)
   })

   writeStream.on('finish', () => {
      console.log('복사가 완료되었습니다!')
   })
}

copyFileWithStreams('source.txt', 'destination.txt')
