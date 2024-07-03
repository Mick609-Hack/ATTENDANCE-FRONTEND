import React, { useState } from "react";
import formimg from "@/assets/Cover-3.1.jpg"
import loginimg from "@/assets/HIITimg.png"
import logo from "../../assets/HIITLOGO.png"
import { NavLink } from "react-router-dom"
import { useLogin } from "../../hooks/useLogin";


export default function Login(props){
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const {login, isLoading} = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        // console.log(email, password)
        await login(email,password)
        
    }

    return (
        <div>
            <div className="formbox desktop">
                <div className="formbx">
                    <form onSubmit={(e) => handleSubmit(e)} className="form">
                        <img className="loginimg" src={loginimg} alt="" /> <br />
                        <h3>{props.userlevel}</h3>
                        <label htmlFor="">Email</label> <br />
                        <input 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} 
                            type="email"
                        />
                        <br />
                        <label htmlFor="">Password</label> <br />
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} 
                            type="password"
                        />
                         <button className="btn">{isLoading?  <span className="fas fa-spinner spin"></span> : "Submit" }</button>
                        <p className="noaccount">Don't Have An Account? <NavLink to = "signup" >Sign up</NavLink> </p>
                    </form>
                </div>
                <div className="formimg">
                    <img src={formimg} alt="" />
                </div>
            </div>
            <div className="mobileLogin">
                <div className="mobileheadernav">
                    <div className="left">
                        <img className="logo" src={logo} alt="" />
                    </div>
                    <div className="right">
                        <h4>Siwes Attendance Portal</h4>
                    </div>  
                </div>
                <div className="formbx">
                    <form onSubmit={(e) => handleSubmit(e)} className="form">
                        <img className="mobileloginimg" src={loginimg} alt="" /> <br />
                        <h3>{props.userlevel}</h3>
                        <label htmlFor="">Email</label> <br />
                        <input 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} 
                            type="email"
                        />
                        <br />
                        <label htmlFor="">Password</label> <br />
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} 
                            type="password"
                        />
                        <button className="btn">{isLoading?  <span className="fas fa-spinner spin"></span> : "Submit" }</button>
                        <p className="noaccount">Don't Have An Account? <NavLink to = "signup" >Sign up</NavLink> </p>
                    </form>
                </div>
            </div>
        </div>
        
    );
}