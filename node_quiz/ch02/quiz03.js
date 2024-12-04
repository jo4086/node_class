// 조건: 오류 메시지를 "Error: Invalid input" 형식으로 출력하세요.
function divide(a, b) {
   if (b === 0) {
      console.error('Error: Invalid input')
      return
   }
   return a / b
}

divide(10, 0) // 실행 결과: Error: Invalid input
