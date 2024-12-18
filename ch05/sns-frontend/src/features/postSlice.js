// sns-frontend/src/features/postSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { createPost, updatePost, deletePost, getPostById, getPosts } from '../api/snsApi'

// 1, 게시물 등록 Thunk
export const createPostThunk = createAsyncThunk('posts/createPost', async (postData, { rejectWithValue }) => {
    try {
        const response = await createPost(postData)
        return response.data.post // /sns-api/routes/post.js에서 res.json({post:{정보들}}) res 성공시 json객체의 post키에 담긴 데이터를 가져와기해 .post를 붙인다.
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || '게시물 등록 실패')
    }
})

// 2. 게시물 수정
export const updatePostThunk = createAsyncThunk('posts/updatePost', async (data, { rejectWithValue }) => {
    try {
        const { id, postData} = data
        const response = await updatePost(id, postData)
        return response.data.post
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || '게시물 수정 실패')
    }
})

// 3. 게시물 삭제
export const deletePostThunk = createAsyncThunk('posts/deletePost', async (id, { rejectWithValue }) => {
    try {
        const response = await deletePost(id)
        return id
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || '게시물 삭제 실패')
    }
})

// 4. 특정 id 게시물 가져오기
export const fetchPostByIdThunk = createAsyncThunk('posts/fetchPostById', async (id, { rejectWithValue }) => {
    try {
        const response = await getPostById(id)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || `ID: ${id} 게시물 조회 실패`)
    }
})

// 5. 전체 게시물 가져오기
export const fetchPostsThunk = createAsyncThunk('posts/fetchPosts', async (page, { rejectWithValue }) => {
    try {
        const response = await getPosts(page) // 백엔드 API URL 확인 필요
        return response.data
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || '게시물 불러오기 실패')
    }
})

const postSlice = createSlice({
    name: 'posts',
    initialState: {
        posts: [],
        pagination: null,
        post: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        // 게시물 작성
        builder
            .addCase(createPostThunk.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(createPostThunk.fulfilled, (state, action) => {
                state.loading = false
                // state.posts = action.payload
                state.posts = [action.payload, ...state.posts]
            })
            .addCase(createPostThunk.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

        // 전체 게시물 조회
        builder // fetchPostsThunk, getPosts
            .addCase(fetchPostsThunk.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchPostsThunk.fulfilled, (state, action) => {
                state.loading = false
                state.posts = action.payload.posts
                state.pagination = action.payload.pagination
            })
            .addCase(fetchPostsThunk.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

        // 3. 게시물 삭제
        builder
            .addCase(deletePostThunk.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(deletePostThunk.fulfilled, (state, action) => {
                state.loading = false
            })
            .addCase(deletePostThunk.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

        //4. 특정 게시물 가져오기
        builder // fetchPostsThunk, getPosts
            .addCase(fetchPostByIdThunk.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchPostByIdThunk.fulfilled, (state, action) => {
                state.loading = false
                state.post = action.payload.post
            })
            .addCase(fetchPostByIdThunk.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

        // 5. 게시물 수정
        builder // updatePostThunk
            .addCase(updatePostThunk.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(updatePostThunk.fulfilled, (state, action) => {
                state.loading = false
                const index = state.posts.findIndex((post) => post.id === action.payload.id)
                if (index !== -1) {
                    state.posts[index] = action.payload // 게시물 교체
                }
            })
            .addCase(updatePostThunk.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    },
})

export default postSlice.reducer
