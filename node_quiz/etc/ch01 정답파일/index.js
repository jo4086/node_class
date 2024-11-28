function calculateAverage(num1, num2, num3) {
   const sum = num1 + num2 + num3
   const average = sum / 3
   return average
}

const average = calculateAverage(10, 20, 30)
console.log(`평균값: ${average}`) // 평균값: 20
