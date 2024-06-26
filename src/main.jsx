import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import AuthContextProvider from './context/authContext.jsx'

// import './index.css'
import "react-toastify/dist/ReactToastify.css"

import {ToastContainer} from "react-toastify"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ToastContainer
        position="top-right"
        autoClose ={5000}
        hideProgressBar = {false}
        newestOnTop ={false}
        closeOnClick
        rtl = {false}
        theme="dark"
        transition : Bounce
        stacked
        /> 
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>,
)
