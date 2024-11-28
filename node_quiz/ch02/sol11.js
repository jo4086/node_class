const fs = require('fs')

function readFileAndUppercase(filePath) {
   fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
         console.error(`Error reading file: ${err.message}`)
         return
      }
      console.log(data.toUpperCase())
   })
}

readFileAndUppercase('input.txt')
