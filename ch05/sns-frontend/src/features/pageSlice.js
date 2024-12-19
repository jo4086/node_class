import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getProfile, getProfileId } from '../api/snsApi'

export const getProfileThunk = createAsyncThunk('page/getProfile', async (_, { rejectWithValue }) => {
    try {
        const response = await getProfile()
        return response.data.user
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || '프로필정보 가져오기 실패!')
    }
})

export const getProfileIdThunk = createAsyncThunk('page/getProfileId', async (id, { rejectWithValue }) => {
    try {
        const response = await getProfileId(id)
        return response.data.user
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || '프로필정보 가져오기 실패!')
    }
})

const pageSlice = createSlice({
    name: 'page',
    initialState: {
        loading: false,
        error: null,
        user: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        // 내 프로필 조회
        builder
            .addCase(getProfileThunk.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getProfileThunk.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload
            })
            .addCase(getProfileThunk.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
        // 다른 회원 프로필 조회
        builder
            .addCase(getProfileIdThunk.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getProfileIdThunk.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload
            })
            .addCase(getProfileIdThunk.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    },
})

export default pageSlice.reducer