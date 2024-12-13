import { Route, Routes } from 'react-router-dom'
import './styles/common.css'

// import { useDispatch, useSelector } from 'react-redux'

import Navbar from './components/shared/Navbar'
import Home from './pages/Home'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import { useEffect } from 'react'


function App() {
   // const { isAuthenticated, user } = useSelector((state) => state.auth)
   
   
   return (
       <>
           <Navbar isAuthenticated={false} />
           <Routes>
               <Route path="/" element={<Home />} />
               <Route path="/signup" element={<SignupPage />} />
               <Route path="/Login" element={<LoginPage />} />
           </Routes>
       </>
   )
}
export default App
