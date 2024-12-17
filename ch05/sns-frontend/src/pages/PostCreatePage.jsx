import React, { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import PostForm from '../components/post/PostForm'
import { createPostThunk } from '../features/postSlice'
import { Container } from '@mui/material'

const PostCreatePage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleSubmit = useCallback(
        (postData) => {
            // 사용자가 입력한 게시물 데이터 postData ={ content:'~', hashtags: '#~ #~', img: 파일 객체  }
            dispatch(createPostThunk(postData))
                .unwrap()
                .then(() => {
                    navigate('/')
                }) // 게시물 등록 후 메인페이지로 이동
                .catch((error) => {
                    console.error('게시물 등록 중 오류 발생: ', error)
                    alert('게시물 등록에 실패하였습니다.')
                })
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
