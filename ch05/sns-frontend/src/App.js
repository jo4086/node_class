import { Route, Routes } from 'react-router-dom'
import './styles/common.css'

import Navbar from './components/shared/Navbar'
import Home from './pages/Home'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'


function App() {
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
