import React, { useState, useEffect} from "react";
import {useParams ,  NavLink , Outlet} from "react-router-dom"
import { useAuthContext } from "../hooks/useAuthContext";
import { myAxios } from "../config/api";
import { errorHandler } from "../errorHandler/errorhandler";

export default function Details(){
    const api = myAxios()
    const {user} = useAuthContext()
    const [details, setDetails] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const{userId} = useParams()
    
    const currentUser = user.user
    console.log(currentUser)
    useEffect(() => {
        if(currentUser.role === "admin"){
            api.get(`/dashboard/records/details/${userId}`)
            .then(data => {
                console.log(data);
                setIsLoading(false)
                setDetails({...data.data.data});
            
            }).catch(error => {
                console.log(error);
                setDetails([])
                setIsLoading(false)
                errorHandler(error)
            });
        }else{
            setIsLoading(false)
        }
    }, [isLoading]);
 
    return(
        <>
            {isLoading?( 
                    <div className="spinbox">
                        <span className="fas fa-spinner spin"></span>
                    </div>
            )
            :
            (<div>
                <div className="dcontainer">
                    <div className="sdetails">
                        <div>
                            <h1>Student Details</h1>
                           { currentUser.role === "admin"? <p>Dashboard - Records - Details</p> : ""}
                        </div>
                         <button>{currentUser.role === "admin"?
                             <NavLink to={`attendance/${details.id}`}>View User Attendance</NavLink>  : ""} 
                        </button>
                    </div>
                    <div className="details">
                        <div className="passportbox">
                            <div className="passport">
                               <img className="passportimg" src={`http://localhost:5000/${currentUser.role === "admin"? details.photo_path : currentUser.photo_path}`} alt="" />
                            </div>
                            <div className="d">
                                 <h2 className="dtext">{currentUser.role === "admin"?
                                      details.lastname +" "+ details.firstname + " "+ (details.role)
                                     : 
                                     currentUser.lastname +" "+ currentUser.firstname + " "+ (currentUser.role)}
                                </h2> <br />
                                 <p>{currentUser.role === "admin"? details.reg_id : currentUser.reg_id}</p>
                            </div>  
                        </div>
                        <div className="dflex h">
                            <div className="dets">
                                <label>ID</label> <br/> <br />
                                <span>{currentUser.role === "admin"? details.reg_id : currentUser.reg_id}</span>
                            </div>
                            <div className="dets">
                                <label>First Name</label> <br/> <br />
                                <span>{currentUser.role === "admin"? details.firstname : currentUser.firstname}</span>
                            </div>
                            <div className="dets">
                                <label>Last Name</label> <br/> <br />
                                <span>{currentUser.role === "admin"? details.lastname : currentUser.lastname}</span>
                            </div>
                        </div>
                        <div className="dflex">
                            <div className="dets">
                                <label>Email</label> <br/> <br />
                                <span>{currentUser.role === "admin"? details.email : currentUser.email}</span>
                            </div>
                            <div className="dets">
                                <label>Phone No</label> <br/> <br />
                                <span>{currentUser.role === "admin"? details.phone_no : currentUser.phone_no}</span>
                            </div>
                            <div className="dets">
                                <label>School</label> <br/> <br />
                                <span>{currentUser.role === "admin"? details.school : currentUser.school}</span>
                            </div>
                        </div>
                        <div className="dflex m">
                            <div className="dets">
                                <label>Reg Date</label> <br/> <br />
                                <span>{currentUser.role === "admin"? details.createdAt : currentUser.createdAt}</span>
                            </div>
                            <div className="dets">
                                <label>Course</label> <br/> <br />
                                <span>{currentUser.role === "admin"? details.course : currentUser.course}</span>
                            </div>
                            <div className="dets">
                                <label>Duration</label> <br/> <br />
                                <span>{currentUser.role === "admin"? details.duration : currentUser.duration}</span>
                            </div>
                        </div>
                    </div>     
                </div>
             </div>
            )}
        </>
       
      
    )
}