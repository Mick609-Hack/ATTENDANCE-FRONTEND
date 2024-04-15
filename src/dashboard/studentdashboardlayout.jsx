import React from "react"
import logo from "../assets/HIITLOGO.png"
import {Outlet, NavLink} from "react-router-dom"
import { useAuthContext } from "../hooks/useAuthContext"

export default function StudentDashboardLayout(){
    const {dispatch} = useAuthContext()
    const handleLogout = async (e) => {
        dispatch({type:"LOGOUT"})
        localStorage.removeItem("user")
    }

    const activeNav = async (e)=>{
        e.target.classlist.add
    }
    return(
        <div>
            <div className="studentDashboardBox">
                <div className="left">
                    <div className="navheader">
                        <img className="navheaderlogo" src={logo} alt="" /> <span>Siwes Portal</span>
                    </div>
                    <div className="nav">
                        <NavLink className="activenav" to="studentdashboard"><li><span className="fa fa-th-large icon "></span> <span className="navword">User Details</span></li></NavLink>  
                        <NavLink onClick={(e)=>activeNav(e)} to="updatedetails"><li><span className="fas fa-user icon "></span> <span className="navword">Update User</span></li></NavLink>
                        <NavLink to="studentannounce"><li><span className="fas fa-bullhorn icon "></span> <span className="navword">Announcements</span></li></NavLink>
                        <NavLink onClick={(e)=> handleLogout(e)}><li><span className="fas fa-sign-out-alt icon"></span> <span className="navword">Logout </span></li></NavLink>
                    </div>
                </div> 
            </div>
            <main>
                <Outlet/>
            </main>
        </div>
    )
}

