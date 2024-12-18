// sns-frontend/src/pages/PostCreatePage.jsx

import React, { useCallback } from 'react'
// import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import PostForm from '../components/post/PostForm'
import { createPostThunk } from '../features/postSlice'
import { Container } from '@mui/material'

const PostCreatePage = () => {
    const dispatch = useDispatch()

    const handleSubmit = useCallback(
        (postData) => {
            // postData  -  사용자가 입력한 게시물 데이터
            dispatch(createPostThunk(postData))
                .unwrap()
                .then(() => {
                    // navigate('/') // 등록 후 메인 페이지 이동
                    window.location.href = '/' // 전체 페이지 새로고침으로 변경
                })
                .catch((err) => {
                    console.error('게시물 등록 실패 : ', err)
                    alert('게시물을 등록할 수 없습니다.', err)
                })
        },
        [dispatch],
    )

    return (
        <Container maxWidth="md">
            <h1>게시물 등록</h1>
            <PostForm onSubmit={handleSubmit} />
        </Container>
    )
}

export default PostCreatePage

/* 
   const handleSubmit = useCallback(
      (postData) => {
         // postData  -  사용자가 입력한 게시물 데이터
         dispatch(createPostThunk(postData))
            .unwrap()
            .then(() => {
               // navigate('/') // 등록 후 메인 페이지 이동
               window.location.href = '/' // 전체 페이지 새로고침으로 변경
            })
            .catch((err) => {
               console.error('게시물 등록 실패 : ', err)
               alert('게시물을 등록할 수 없습니다.', err)
            })
      },
      [dispatch, navigate]
   )
*/
/*
const handleSubmit = useCallback(
    (postData) => {
        // postData  -  사용자가 입력한 게시물 데이터
        dispatch(createPostThunk(postData))
            .unwrap()
            .then(() => {
                // navigate('/') // 등록 후 메인 페이지 이동
                window.location.href = '/' // 전체 페이지 새로고침으로 변경
            })
            .catch((err) => {
                console.error('게시물 등록 실패 : ', err)
                alert('게시물을 등록할 수 없습니다.', err)
            })
    },
    [dispatch, navigate],
)
*/
/*
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
}
*/
