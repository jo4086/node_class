import shopmaxApi from "./axiosApi";

export const registerUser = async (userData) => {
    try {
        const response = await shopmaxApi.post('/auth/join', userData)
        return response
    } catch (err) {
        console.error(`API Request오류: ${err.message} `)
        throw err
    }
}
//로그인
export const loginUser = async (credentials) => {
   try {
      const response = await shopmaxApi.post('/auth/login', credentials)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

//로그아웃
export const logoutUser = async () => {
   try {
      const response = await shopmaxApi.get('/auth/logout')
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

//로그인 상태 확인
export const checkAuthStatus = async () => {
   try {
      const response = await shopmaxApi.get('/auth/status')
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}