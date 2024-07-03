import React, { useState, useEffect } from "react"
import { NavLink } from "react-router-dom";
import { myAxios } from "../config/api";
import { errorHandler } from "../errorHandler/errorhandler";

export default function Appointments(){
    const [isLoading, setIsLoading] = useState(true);
    const [appointments, setAppointments] = useState([]);
    const [details, setDetails] = useState("")
    const api = myAxios()
    useEffect(() => {
        api.get("/dashboard/appointments")
            .then(data => {
                console.log(data);
                setTimeout(()=>{
                    setIsLoading(false)
                },1000)
                 setAppointments([...data.data.data]);
                 
            }).catch(error => {
                console.log(error);
                setTimeout(()=>{
                    setIsLoading(false)
                },1000)
                errorHandler(error)
            });

        api.get("/getDashboardDetails")
            .then(data => {
                console.log(data);
                setTimeout(()=>{
                    setIsLoading(false)
                },1000)
                 setDetails({...data.data.data});
                 
            }).catch(error => {
                console.log(error);
                setTimeout(()=>{
                    setIsLoading(false)
                },1000)
        });
    },[isLoading]);

    return(
        <> 
            { isLoading?( 
                    <div>
                        <div className="title skeleton">
                            <div className="left">
                                <div className="roundan skeleton"></div>
                                <div className="roundantext"></div>
                            </div>
                            <div className="right">
                                <div className="users"></div>
                                <div className="present"></div>
                                <div className="absent"></div>
                                <div className="post"> </div>
                            </div>
                        </div>       
                        <div className="appointmentheader skeleton"></div>
                    </div>       
            )
            :
            ( <div>
                    <div className="title">
                        <div className="left">
                            <div className="roundan">
                                <span className="an far fa-calendar-alt"></span>
                            </div>
                            <div className="roundantext">
                                <h2>TODAY'S APPOINTMENTS</h2>
                                <p>This Shows Daily Data In Real Time</p>
                            </div>
                            
                        </div>
                        <div className="right">
                            <div className="users">
                                    <h5>Total Students</h5>
                                    <NavLink to="/dashboard/students" style={{textDecoration: "none"}}>
                                        <div className="spn">
                                        <span>{details.users? details.users : 0 }</span><span className="fas fa-user"></span>
                                        </div>
                                    </NavLink>
                            </div>
                            <div className="present">
                                    <h5>Present</h5>
                                    <div className="spn">
                                    <span>{details.present? details.present : 0}</span><span className="green fas fa-check"></span>
                                    </div>
                            </div>
                            <div className="absent">
                                    <h5>Absent</h5>
                                    <div className="spn">
                                    <span>{details.absent? details.absent : 0}</span><span className="red fas fa-times"></span>
                                    </div>
                            </div>

                            <div className="absent">
                                    <h5>Checked out</h5>
                                    <div className="spn">
                                    <span>{details.checked_out? details.checked_out : 0}</span><span className="red fas fa-check"></span>
                                    </div>
                                    {/* <button>Make a post <span className="fas fa-pencil-alt"></span></button> */}
                                    
                            </div>

                        </div>
                    </div> 
                    <div className="appointmentbox">
                        <div className="appointmentheader">
                            <ul>
                                <li>Id</li>
                                <li>First Name</li>
                                <li>Last Name</li>
                                <li>Email</li>
                                <li>Phone No</li>
                                <li>School</li>
                                <li>Status</li>
                            </ul>
                        </div>
                        {appointments.map(appointment=>(
                           <div className="appointment" key={appointment.id}>
                                <span>{appointment.user.reg_id}</span>
                                <span>{appointment.user.firstname}</span>
                                <span>{appointment.user.lastname}</span>
                                <span>{appointment.user.email}</span>
                                <span>{appointment.user.phone_no}</span>
                                <span>{appointment.user.school}</span>
                                { appointment.checked_out === false? 
                                    <span className="status">Checked-in: {appointment.createdAt}</span> 
                                    : 
                                    <span className="statusred">Checked-out: {appointment.updatedAt} </span>
                                }
                           </div>
                        ))} 
                    </div>
                </div>
            )}
       </>

       
    )
}