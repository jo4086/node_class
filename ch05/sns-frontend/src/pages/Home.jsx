import { Container, Typography, Pagination, Stack } from '@mui/material'
import React, { useCallback, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPostsThunk } from '../features/postSlice'
import PostItem from '../components/post/PostItem'

const Home = ({ isAuthenticated, user }) => {
    const [page, setPage] = useState(1) // 현재 페이지
    const dispatch = useDispatch()
    const { posts, pagination, loading, error } = useSelector((state) => state.posts)

    useEffect(() => {
        dispatch(fetchPostsThunk(page))
    }, [dispatch, page])

    // 페이지변경
    const handlePageChange = useCallback((event, value) => {
        setPage(value)
    }, [])

    return (
        <Container maxWidth="xs">
            <Typography variant="h4" align="center" gutterBottom>
                Home Feed
            </Typography>

            {loading && (
                <Typography variant="body1" align="center">
                    로딩 중...
                </Typography>
            )}

            {error && (
                <Typography variant="body1" align="center" color="error">
                    에러 발생:{error}
                </Typography>
            )}
            {posts.length > 0 ? (
                <>
                    {posts.map((post) => (
                        <PostItem key={post.id} post={post} isAuthenticated={isAuthenticated} user={user} />
                    ))}
                    <Stack spacing={2} sx={{ mt: 3, alignItems: 'center' }}>
                        <Pagination
                            count={pagination.totalPages} // 전체 페이지수
                            post={page}
                            onChange={handlePageChange} // 페이지를 변경하는 함수
                        />
                    </Stack>
                </>
            ) : (
                !loading && (
                    <Typography variant="body1" align="center">
                        게시물이 없습니다.
                    </Typography>
                )
            )}
        </Container>
    )
}

export default Home

/*
{
    posts.length > 0 ? (
        <>
            <Stack spacing={2} sx={{ mt: 3, alignItems: 'center' }}></Stack>
        </>
    ) : (
        !loading && (
            <Typography variant="body1" align="center">
                게시물이 없습니다.
            </Typography>
        )
    )
}
*/
