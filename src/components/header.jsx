import React from "react"
import logo from "../assets/HIITLOGO.png"
import { NavLink } from "react-router-dom"
import  "../assets/fonts/fontawesome-free-5.15.3-web/css/all.css"
import { useAuthContext } from "../hooks/useAuthContext"

export default function Header(props){
    const {user} = useAuthContext()
    return(
        <div style={props.headerdivstyle} className="headerdiv">
            <div style={props.headerintrostyle} className="intro">
                <a href="">Twitter</a>
                <a href="">Instagram</a>
                <a href="">Linkedin</a>
            </div>
             <div className="headernav">
                  <div className="left">
                      <img className="logo" src={logo} alt="" />
                      <h4>SIWES+ Attendance Portal</h4>
                  </div>
                  <div className="right">
                     <ul>
                        <li><NavLink to="/">Home</NavLink> </li>
                        <li><NavLink to="/dashboard">Dashboard</NavLink> </li>
                        <li><NavLink to="/signup">Students</NavLink></li>
                     </ul>
                  </div>
                  <div className="user">
                        <span className="fa fa-user"></span>
                        <h4>{user? user.user.firstname + " " + user.user.lastname  : "NO USER"}</h4>
                  </div>
                  
             </div>
        </div>
    )
}

