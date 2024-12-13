import React, { useState, useMemo, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TextField, Button, Container, Typography, CircularProgress } from '@mui/material'
import { loginUserThunk } from '../../features/authSlice'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
    const [email, setEmail] = useState('') // 이메일 상태
    const [password, setPassword] = useState('') // 비밀번호 상태
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { loading, error } = useSelector((state) => state.auth)

    // useCallback을 사용하여 handleLogin 함수를 메모제이션
    const handleLogin = useCallback(
        (e) => {
            e.preventDefault()
            if (email.trim() && password.trim()) {
                dispatch(loginUserThunk({ email, password }))
                    .unwrap()
                    .then(() => navigate('/')) // 로그인 성공 시 메인페이지로 이동
                    .catch((error) => console.error('로그인 실패: ', error))
            }
        },
        [dispatch, email, password, navigate],
    )

    // useMemo를 활용한 재 랜더링 방지, 로딩 상태가 변경
    const loginButtonContent = useMemo(
        () =>
            loading ? (
                <CircularProgress
                    size={24}
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                    }}
                />
            ) : (
                '로그인'
            ),
        [loading], // 로딩상태가 변경될 때만 버튼 내용만 랜더링
    )

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>
                로그인
            </Typography>
            {error && (
                <Typography color="error" align="center">
                    {error}
                </Typography>
            )}
            <form onSubmit={handleLogin}>
                <TextField label="이메일" name="email" fullWidth margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} />
                <TextField label="비밀번호" type="password" name="password" fullWidth margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} />

                <Button variant="contained" color="primary" type="submit" fullWidth disabled={loading} sx={{ position: 'relative', marginTop: '20px' }}>
                    {loginButtonContent}
                </Button>
            </form>

            <p>
                계정이 없으신가요? <Link to="/signup">회원가입</Link>
            </p>
        </Container>
    )
}

export default Login
