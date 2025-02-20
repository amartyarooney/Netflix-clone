import { Route, Routes } from "react-router-dom"
import SignupPage from "./pages/SignupPage"
import HomePage from "./pages/home/HomePage"
import LoginPage from "./pages/LoginPage"
import Footer from "./components/Footer"
import { Toaster } from "react-hot-toast"
import { useAuthStore } from "../store/authUser"

function App() {
  const {user, isCheckingAuth} = useAuthStore();
  console.log("auth user is here",user); 
  return (
    <>
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/signup' element={<SignupPage />} />
      <Route path='/login' element={<LoginPage />} />
    </Routes>
    <Footer />
    <Toaster/>
    </>
  )
}

export default App
