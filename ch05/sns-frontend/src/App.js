// sns-frontend/src/App.js

// import SignupPage from './pages/SignupPage'
// import PostCreatePage from './pages/PostCreatePage'
// import LoginPage from './pages/LoginPage'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import React, { useEffect } from 'react'
import { SignupPage, PostCreatePage, LoginPage, PostEditPage } from './pages'
import Navbar from './components/shared/Navbar'
import Home from './pages/Home'
import { checkAuthStatusThunk } from './features/authSlice'

import './styles/common.css'

function App() {
    const dispatch = useDispatch()
    const { isAuthenticated, user } = useSelector((state) => state.auth)

    //새로고침시 redux 데이터가 사라지거나 서버에서 문제 발생 가능성이 있으므로 지속적인 로그인 상태 확인을 위해 사용
    useEffect(() => {
        dispatch(checkAuthStatusThunk())
    }, [dispatch])

    
    return (
        <>
            <Navbar isAuthenticated={isAuthenticated} user={user} />
            <Routes>
                <Route path="/" element={<Home isAuthenticated={isAuthenticated} user={user} />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/posts/create" element={<PostCreatePage />} />
                <Route path="/posts/edit/:id" element={<PostEditPage />} />
            </Routes>
        </>
    )
}
export default App
