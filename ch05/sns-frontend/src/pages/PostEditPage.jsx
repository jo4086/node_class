import React, { useCallback, useEffect } from 'react'
import PostForm from '../components/post/PostForm'
import { useParams } from 'react-router-dom'
import { Container } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPostByIdThunk, updatePostThunk } from '../features/postSlice'

const PostEditPage = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const { post, loading, error } = useSelector((state) => state.posts)

    useEffect(() => {
        dispatch(fetchPostByIdThunk(id))
    }, [dispatch, id])

    const handleSubmit = useCallback((postData) => {
        dispatch(updatePostThunk({id, postData}))
            .unwrap()
            .then(() => {
                window.location.href = '/'
            })
            .catch((err) => {
                console.error('게시물 수정 실패: ', err)
                alert('게시물을 수정할 수 없습니다.', err)
            })
    })
    
    if (loading) return <p>로딩 중...</p>
    if (error) return <p>에러발생 : {error}</p>

    return (
        <Container>
            <h1>PostEditPage입니다.</h1>
            {post && <PostForm onSubmit={handleSubmit} initialValues={post} />} 
        </Container>
    )
}

export default PostEditPage
