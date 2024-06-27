import React, { useState, useEffect } from "react"
import { myAxios } from "../config/api";
import { errorHandler } from "../errorHandler/errorhandler";
import { successHandler } from "../successHandler/successhandler";
import { NavLink } from "react-router-dom";



export default function StudentList(){
    const api = myAxios()
    const [users , setUsers] = useState([])
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        api.get("/getUsers")
            .then(data => {
                console.log(data , "olorun miii");
                setTimeout(()=>{
                    setUsers([...data.data.data])
                    setIsLoading(false)
                },1000)
                successHandler(data)
             
            
            }).catch(error => {
                console.log(error);
                setUsers([])
                setTimeout(()=>{
                    setIsLoading(false)
                },1000)
                errorHandler(error)
            });
    }, []);

    return(
        <div>
            <div className="recordhead">
                <div className="left">
                   <NavLink to="/dashboard/assessment"><h3>Assess Intern</h3></NavLink> 
                </div>
                <div className="middle">
                    <h2>INTERN LIST</h2>
                </div>
                <div className="right">
                    <label htmlFor="">Date:</label>
                    {/* <input value={date} onChange={(e)=> setDate(e.target.value) + setIsLoading(true)} type="date" /> */}
                </div>
            </div>
            <div className="appointmentbox">
                <div className="appointmentheader">
                    <ul>
                        <li>Id</li>
                        <li>First Name</li>
                        <li>Last Name</li>
                        <li>Email</li>
                        <li>School</li>
                        <li>Reg Date</li>
                        <li>Duration</li>
                    </ul>
                </div>
        
               {users.map(user=>(
                  <div className="appointment" key={user.id}>
                    <span>{user.reg_id}</span>
                    <span>{user.firstname}</span>
                    <span>{user.lastname}</span>
                    <span>{user.email}</span>
                    <span>{user.school}</span>
                    <span>{user.date}</span>
                    <span>{user.duration}</span>
                   
                    
                  </div>
               ))}
           </div>
        </div>
        
    )
}