const fs = require('fs')
const file = fs.createWriteStream('./big.txt')

for (let i = 0; i <= 10000; i++) {
    file.write('안녕하세요, 엄청 큰 파일을 만들어냅니다. 각오 단단히 하세요\n')
}

file.end()