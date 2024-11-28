function divide(a, b) {
   if (b === 0) {
      console.error('Error: Invalid input')
      return
   }
   return a / b
}

divide(10, 0) // 실행 결과: Error: Invalid input
