import React, { useState } from "react"
import logo from "../assets/HIITLOGO.png"
import {Outlet, NavLink} from "react-router-dom"
import { useAuthContext } from "../hooks/useAuthContext"

export default function StudentDashboardLayout(){
    const [expands, setIsExpands] = useState(false)
    const {dispatch} = useAuthContext()
    const handleLogout = async (e) => {
        dispatch({type:"LOGOUT"})
        localStorage.removeItem("user")
    }

    const expandNav = async (e)=>{
        setIsExpands(!expands)
    }
    // console.log(expands)

    return(
        <div>
            <div className="studentDashboardBox">
                <div style={expands? {width:"20%"} : {width:"5%"}} className="left">
                    <div onClick={(e)=>expandNav(e)} className="navheader">
                        <img className="navheaderlogo" src={logo} alt="" /> <span>{expands? "Siwes Portal" : <span className="fas fa-arrow-right"></span>}</span>
                    </div>
                    <div style={expands? {display:"flex"} : {display:"none"}} className="nav">
                        <NavLink className="activenav" to="studentdashboard"><li><span className="fa fa-th-large icon "></span> <span className="navword">User Details</span></li></NavLink>  
                        <NavLink to="updatedetails"><li><span className="fas fa-user icon "></span> <span className="navword">Update User</span></li></NavLink>
                        <NavLink to="studentannounce"><li><span className="fas fa-bullhorn icon "></span> <span className="navword">Announcements</span></li></NavLink>
                        <NavLink onClick={(e)=> handleLogout(e)}><li><span className="fas fa-sign-out-alt icon"></span> <span className="navword">Logout </span></li></NavLink>
                    </div>
                </div> 
            </div>
            <main style={expands? {width:"100%"} : {width:"90%"}} >
                <Outlet/>
            </main>
        </div>
    )
}

