const path = require('path')

const string = __filename // 파일의 경로와 이름
console.log(string)

console.log('겅로 정보 처리 ---------------------')
console.log(path.sep) //  경로의 구분자를 알려줌

console.log('경로 분석---------------------------')
console.log('dirname: ', path.dirname(string))
console.log('extname: ', path.extname(string))
console.log('basename: ', path.basename(string)) // 파일의 이름 표시
console.log('.js: ', path.basename(string, '-js')) // 파일의 이름에서 확장자 제거

console.log('경로 조작--------------------------- ')
console.log(path.parse(string))
console.log(
   'path.format(): ',
   path.format({
      dir: 'C:\\users\\zerocho',
      name: 'path',
      ext: '.js',
   })
)
console.log('path.normaize(): ', path.normalize('C://users\\\\zerocho\\path.js'))
console.log('')

console.log('-------------------------')
console.log('path.isAbsolute(C:\\): ', path.isAbsolute('C:\\'))
// console.log('path.parse(string)) parse한 경로를 다시 합친다)

console.log('path.isAbsolute(./home):', path.isAbsolute('./home'))
console.log('------------------------------')
console.log('path.relative():', path.relative('C:\\users\\zerocho\\path.js', 'C:\\')) // 경로 두개 중 첫 번째 경로에서 두번째 경로로 가는 법을 알려줌
console.log('path.join():', path.join('C:project/node', '/users', '/zerocho')) // 여러 인수를 넣으면 하나의 경로로 합침
