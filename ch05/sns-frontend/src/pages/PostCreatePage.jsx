// sns-frontend/src/pages/PostCreatePage.jsx

import React, { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import PostForm from '../components/post/PostForm'
import { createPostThunk, fetchPostsThunk } from '../features/postSlice'
import { Container } from '@mui/material'

const PostCreatePage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleSubmit = useCallback(
        async (postData) => {
            try {
                // 사용자가 입력한 게시물 데이터 postData ={ content:'~', hashtags: '#~ #~', img: 파일 객체  }
                await dispatch(createPostThunk(postData)).unwrap()
                await dispatch(fetchPostsThunk(1))
                navigate('/')
            } catch (error) {
                console.error('게시물 등록 중 오류 발생: ', error)
                alert('게시물 등록에 실패하였습니다.')
            } // 게시물 등록 후 메인페이지로 이동
        },
        [dispatch, navigate], // 의존성 배열에 필요한 값 추가~
    )

    return (
        <Container maxWidth="md">
            <h1>게시물 등록</h1>
            <PostForm onSubmit={handleSubmit} />
        </Container>
    )
}

export default PostCreatePage
