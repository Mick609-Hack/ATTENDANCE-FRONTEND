import React, { useState, useEffect } from "react"
import { myAxios } from "../config/api";
import { errorHandler } from "../errorHandler/errorhandler";
import { successHandler } from "../successHandler/successhandler";
import { NavLink } from "react-router-dom";

export default function AssessmentDetail(){
    const api = myAxios()
    const [assessments , setAssessments] = useState([])
    // const [ regId, setRegId ] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        api.get(`/assessments`)
            .then(data => {
                console.log(data , "olorun miii");
                setTimeout(()=>{
                    setAssessments([...data.data.data])
                    setIsLoading(false)
                    // setRegId("")
                },1000)
                successHandler(data)
            }).catch(error => {
                console.log(error);
                setAssessments([])
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
                   <NavLink to="/dashboard/assessment/assess"><button style={{cursor:"pointer" , padding:"5px", borderRadius:"2px" , border:"1px solid #35386f"}}>ASSESS A STUDENT</button> </NavLink> 
                </div>
                <div className="middle">
                    <h2>ASSESSMENT</h2>
                </div>
                <div className="right">
                    <label htmlFor="">Date:</label>
                    {/* <input value={date} onChange={(e)=> setDate(e.target.value) + setIsLoading(true)} type="date" /> */}
                </div>
            </div>
            <div className="appointmentbox">
                <div className="assessmentheader">
                    <ul>
                        <li>S/N</li>
                        <li>Surname</li> 
                        <li>Firstname</li>
                        <li>Id</li>
                        <li>Start Date</li>
                        {/* <li>Finish Date</li> */}
                        <li>Duration</li>
                        <li>University</li>
                        <li>EI Att</li>
                        <li>EI Web Add</li>
                        <li>ENT Att</li>
                        <li>ENT Web Add</li>
                        <li>ITTW Att</li>
                        <li>AOS `(% of Success)20%`</li>
                        <li>Digital Literacy Comp 5%</li>
                        <li>Affiliate Role Conver 5%</li>
                        <li>Punctuality at work 10%</li>
                        <li>workplace Behavior 10%</li>
                        <li>Total score 100%</li>
                    </ul>
                </div>
                {assessments.map((assessment, index)=>( 
                    <div className="assessment" key={assessment.id}>
                        <ul>
                            <li>{index+1}</li> 
                            <li>{assessment.user.lastname}</li>
                            <li>{assessment.user.firstname} </li>
                            <li>{assessment.user.reg_id} </li> 
                            <li>{assessment.date} </li>
                            {/* <li>{assessment.date} </li> */}
                            <li>{assessment.user.duration}</li> 
                            <li>{assessment.user.school}</li>
                            <li>{assessment.EIAtt}%</li>
                            <li>{assessment.ENTAtt}%</li>
                            <li>{assessment.EIWebAdd}%</li>
                            <li>{assessment.ENTWebAdd}%</li>
                            <li>{assessment.ITTWAtt}%</li>
                            <li>{assessment.AOS}%</li>
                            <li>{assessment.Digital}%</li>
                            <li>{assessment.Affiliate}%</li>  
                            <li>{assessment.Punctuality}%</li>
                            <li>{assessment.Workplace}%</li>
                            <li>{assessment.total}%</li>
                        </ul>
                    </div>
                ))} 
            </div>
        </div>
    )
}