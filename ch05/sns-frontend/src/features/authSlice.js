import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {registerUser} from '../api/snsApi'

/*
rejectWithValue: 에러 메세지를 rejected에 action.payload로 전달할 때 사용
rejectWithValue 사용시 에러에 더 구체적인 내용을 담을 수 있다.
*/

/*** [?.] <= Optinal Chaining
const error = {response: undefined}
console.log(error.response.data.meesage) // TypeError 발생, (Cannot read property 'data' of undefined)
error.response?.data?.message // undefined 반환, 에러 없음
*/


export const registerUserThunk = createAsyncThunk('auth/registerUser', async (userData, { rejectWithValue }) => {
   try {
      const response = await registerUser(userData)
      return response.data.user
   } catch (error) {
      // error.response.data.message: [../../../sns-api/routes/auth.js]에 있는 에러메세지를 가져다씀
      return rejectWithValue(error.response?.data?.message || '회원가입 실패')
   }
})

const authSlice = createSlice({
   name: 'auth',
   initialState: {
      // 서버에서 가져오는 데이터가 배열 일 때만 []로 초기값, 나머지는 null로
      // null은 주로 문자열 or jonn 객체 데이터일 때 사용함.
      user: null,
      loadding: false,
      error: null,
   },
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(registerUserThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(registerUserThunk.fulfilled, (state, action) => {
            state.loading = false
            state.user  = action.payload
         })
         .addCase(registerUserThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
   }
})

export default authSlice.reducer
