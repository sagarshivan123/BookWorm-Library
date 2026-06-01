import React, { useEffect } from "react";
import {BrowserRouter as Router ,Routes ,Route,Navigate} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import OTP from "./pages/OTP.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import {ToastContainer} from "react-toastify";
import { useSelector,useDispatch } from "react-redux";
import { getUser } from "./store/slices/authSlice.js";
import { fetchAllUsers } from "./store/slices/userSlice.js";
import { fetchAllBooks } from "./store/slices/bookSlice.js";
import { fetchUserBorrowedBooks } from "./store/slices/borrowSlice.js";
import { fetchAllBorrowedBooks } from "./store/slices/borrowSlice.js";



const GuestRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return !isAuthenticated ? children : <Navigate to="/" replace />;
};


const App = () => {
  const {user, isAuthenticated}=useSelector((state)=>state.auth);
  const dispatch=useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
   
    if(isAuthenticated && user?.role==="user"){
      
      dispatch(fetchAllBooks())
      dispatch(fetchUserBorrowedBooks());
    }
    if(isAuthenticated && user?.role==="Admin"){
      dispatch(fetchAllUsers());
      dispatch(fetchAllBorrowedBooks());
    }
  },[isAuthenticated,user?.role]);
  return <Router>
  <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/login" element={<GuestRoute><Login /></GuestRoute>}/>
    <Route path="/register" element={<GuestRoute><Register/></GuestRoute>}/>
    <Route path="/password/forgot" element={<ForgotPassword/>}/>
    <Route path="/otp-verification/:email" element={<OTP/>}/>
    <Route path="/password/reset/:token" element={<ResetPassword/>}/>
  </Routes>
  <ToastContainer theme="dark"/>
  </Router>;
};

export default App;