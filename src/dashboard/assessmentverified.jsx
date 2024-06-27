import React, { useState, useEffect } from "react"
import { myAxios } from "../config/api";
import { errorHandler } from "../errorHandler/errorhandler";
import { successHandler } from "../successHandler/successhandler";
import {useParams, useNavigate} from "react-router-dom";

export default function AssessVerified(){
    const navigate = useNavigate()
    const api = myAxios()
    const [user , setUser] = useState({})
    // const [ regId, setRegId ] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const{regId} = useParams()
    useEffect(() => {
        api.get(`/verifyassess/${regId}`)
            .then(data => {
                console.log(data , "olorun miii");
                setTimeout(()=>{
                    setUser({...data.data.data})
                    setIsLoading(false)
                    // setRegId("")
                },1000)
                successHandler(data)
            }).catch(error => {
                console.log(error);
                setUser([])
                setTimeout(()=>{
                    setIsLoading(false)
                },1000)
                errorHandler(error)
            });
    }, []);


    const handleSubmit = async (e) => {
         e.preventDefault()
         navigate(`/dashboard/assessment/assess/form/${regId}`)
       
   }

    return(
        <div> 
            <div className="verifybox">
                <h2>Proceed To Assess Student</h2>
                <div className="passport" style={{display:"flex", justifyContent:"center" ,width:"40%", marginInline:"auto"}}>
                    <img className="passportimg" src={`http://localhost:5000/${user.photo_path}`} alt="" />
                </div>
                <div style={{textAlign:"center"}}>
                  <span>{user.firstname}</span> <span>{user.lastname}</span> <span>{user.reg_id}</span>
                </div>
                <button onClick={(e) => handleSubmit(e)}>
                    Proceed To Assess Student
                </button>
            </div>
        </div>
    )
}