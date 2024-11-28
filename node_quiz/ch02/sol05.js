// 실행 시간을 측정
console.time('Execution Time')

function calculate() {
   let sum = 0
   for (let i = 0; i < 1e6; i++) {
      sum += i
   }
   return sum
}

calculate()

console.timeEnd('Execution Time')
