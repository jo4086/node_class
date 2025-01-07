import './styles/common.css'
import { Route, Routes } from 'react-router-dom'

import Navbar from './components/shared/Navbar'
import Footer from './components/shared/Footer'
import Home from './pages/Home'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'

function App() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/singup" element={<SignupPage />} />
                <Route path="/login" element={<LoginPage />} />
            </Routes>
            <Footer />
        </>
    )
}
export default App
