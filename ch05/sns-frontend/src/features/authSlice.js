import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { registerUser, loginUser, logoutUser, checkAuthStatus } from '../api/snsApi'

/*
rejectWithValue: 에러 메세지를 rejected에 action.payload로 전달할 때 사용
rejectWithValue 사용시 에러에 더 구체적인 내용을 담을 수 있다.
*/

/*** [?.] <= Optional Chaining
const error = {response: undefined}
console.log(error.response.data.meesage) // TypeError 발생, (Cannot read property 'data' of undefined)
error.response?.data?.message // undefined 반환, 에러 없음
*/

// 회원가입 Thunk
export const registerUserThunk = createAsyncThunk('auth/registerUser', async (userData, { rejectWithValue }) => {
    try {
        const response = await registerUser(userData)
        return response.data.user
    } catch (error) {
        // error.response.data.message: [../../../sns-api/routes/auth.js]에 있는 에러메세지를 가져다씀
        return rejectWithValue(error.response?.data?.message || '회원가입 실패')
    }
})

// 로그인 Thunk || credentials = { email: 'test@test.com', password: '1111' } 형태로 넘어옴
export const loginUserThunk = createAsyncThunk('auth/loginUser', async (credentials, { rejectWithValue }) => {
    try {
        const response = await loginUser(credentials)
        return response.data.user // response.data = 백엔드에서 res.json({})을 의미함,, res.json에 Key=user인 객체의 값을 가져옴
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || '로그인 실패')
    }
})

// 로그아웃 Thunk || async(_, { rejectWithValue }) ===> '_' 언더바는 매개변수 값이 없을 때 사용
export const logoutUserThunk = createAsyncThunk('auth/logoutUser', async (_, { rejectWithValue }) => {
    try {
        const response = await logoutUser()
        return response.data
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || '로그아웃 실패')
    }
})

export const checkAuthStatusThunk = createAsyncThunk('auth/checkAuthStatus', async (_, { rejectWithValue }) => {
    try {
        const response = await checkAuthStatus()
        return response.data
    } catch (err) {
        return rejectWithValue(err.response?.data?.message || '상태 확인 실패')
    }
})

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        // 서버에서 가져오는 데이터가 배열 일 때만 []로 초기값, 나머지는 null로
        // null은 주로 문자열 or jonn 객체 데이터일 때 사용함.
        user: null,
        isAuthenticated: false, // 로그인 상태
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        // 회원가입
        builder
            .addCase(registerUserThunk.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(registerUserThunk.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload
            })
            .addCase(registerUserThunk.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
        // 로그인

        builder
            .addCase(loginUserThunk.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(loginUserThunk.fulfilled, (state, action) => {
                state.loading = false
                state.isAuthenticated = true
                state.user = action.payload
            })
            .addCase(loginUserThunk.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

        builder
            .addCase(logoutUserThunk.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(logoutUserThunk.fulfilled, (state, action) => {
                state.loading = false
                state.isAuthenticated = false
                state.user = null // 로그아웃 후 유저 정보 초기화
            })
            .addCase(logoutUserThunk.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
        
        // 로그인 상태
        builder
            .addCase(checkAuthStatusThunk.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(checkAuthStatusThunk.fulfilled, (state, action) => {
                state.loading = false
                state.isAuthenticated = action.payload.isAuthenticated // 로그인 된상태이기에 true상태인 isAuthenticated의 Thunk의 리턴값을 가져온다. (정보추출)
                state.user = action.payload.user || null
                state.error = null
            })
            .addCase(checkAuthStatusThunk.rejected, (state, action) => {
                state.loading = false
                state.isAuthenticated = false
                state.error = action.payload
                state.user = null
            })

            // App.js에서 매번 isAuthenticated로 로그인 상태확인부터 한다.)
    },
})





export default authSlice.reducer
