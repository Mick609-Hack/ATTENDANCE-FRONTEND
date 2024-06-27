import React, { useState, useEffect } from "react"
import { myAxios } from "../config/api";
import { errorHandler } from "../errorHandler/errorhandler";
import { successHandler } from "../successHandler/successhandler";
import { NavLink, useNavigate} from "react-router-dom";

export default function VerifyForm(){
    const navigate = useNavigate()
    const api = myAxios()
    const [user , setUser] = useState({})
    const [ regId, setRegId ] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    
    const handleSubmit = async (e) => {
         e.preventDefault()
        
            api.post("/verifyassess",{
                regId
            })
                .then(data => {
                    console.log(data , "olorun miii");
                    setTimeout(()=>{
                        // setUser([...data.data.data])
                        setIsLoading(false)
                        setRegId("")
                    },1000)
                    successHandler(data)
                    navigate(`/dashboard/assessment/assess/${regId}`)
                
                
                }).catch(error => {
                    console.log(error);
                    setUser([])
                    setTimeout(()=>{
                        setIsLoading(false)
                    },1000)
                    errorHandler(error)
                });
   }

    return(
        <div> 
            <div className="verifybox">
                <h2>Verify Student To Assess</h2>
                <input placeholder="Enter Student ID"
                    type="text"
                    value={regId}
                    onChange={(e) => setRegId(e.target.value)} 
                /> <br />
                
                <button onClick={(e) => handleSubmit(e)}>
                    submit
                </button>
            </div>
        </div>
    )
}