import React, { useState} from "react"
import { myAxios } from "../config/api";
import { successHandler } from "../successHandler/successhandler";
import { errorHandler } from "../errorHandler/errorhandler";
import { useAuthContext } from "../hooks/useAuthContext";

export default function StudentUpdateDetails(){
    const api = myAxios()
    const {user} = useAuthContext()
    const currentUser = user.user
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        firstname:"" , lastname:"" , email:"" , school:"", phone_no:"" , course:"", location:"" , duration:"",password:""
     })
  
     const {firstname,lastname,email,school,phone_no,course,location,duration,password} = formData

     function handleChange(e){
        setFormData(prevFormData =>{
            return{
                ...prevFormData,
                [e.target.name] : e.target.value
            }

        })
   }

   const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true)
        api.put("/updateuserdetails", {
            firstname, lastname,email, school, phone_no, course, location,duration,password
        }).then( data  => {
            console.log(data, "data");
            setTimeout(() => {
            setIsLoading(false) 
            }, 1000);
            successHandler(data)
            }
        )
        .catch(error=>{
            console.log(error);
            setTimeout(() => {
                setIsLoading(false) 
            }, 1000);
            errorHandler(error)
        });
}
   

    return(
        <div>
            <div className="studentdashboardright">
                <div className="details">
                    <div className="welcome">
                        <h3>Hello {currentUser.firstname}! Update Your Details Here</h3>
                    </div>
                    <div className="detailsformbx">
                        <form onSubmit={(e) => handleSubmit(e)} className="form" action="">
                            <h3>SignUp</h3>
                            <label htmlFor="">First Name</label> <br />
                            <input name="firstname" value={formData.firstname} onChange={(e)=> handleChange(e)} type="text"/> <br />

                            <label htmlFor="">Last Name</label> <br />
                            <input name="lastname" value={formData.lastname} onChange={(e)=> handleChange(e)} type="text"/><br />

                            <label htmlFor="">Email</label> <br />
                            <input name="email" value={formData.email} onChange={(e)=> handleChange(e)} type="email"/><br />

                            <label htmlFor="">School (University/Polytechnic)</label> <br />
                            <input name="school" value={formData.school} onChange={(e)=> handleChange(e)} type="text"/><br />

                            <label htmlFor="">Phone No</label> <br />
                            <input name="phone_no" value={formData.phone_no} onChange={(e)=> handleChange(e)} type="number"/> <br />

                            <label htmlFor="">Registered Course</label> <br />
                            <input name="course" value={formData.course} onChange={(e)=> handleChange(e)} type="text"/>

                            <label htmlFor="">Location (HIIT branch)</label> <br />
                            <select name="location" onChange={(e)=> handleChange(e)}>
                                <option>Select</option>
                                <option name="location" value="Lagos">Lagos</option>
                                <option value="Kubwa">Kubwa</option>
                                <option value="Kano">Kano</option>
                                <option value="Ibadan">Ibadan</option>
                                <option value="Wuse">Wuse</option>
                            </select>

                            <label htmlFor="">Duration</label> <br />
                            <input name="duration" value={formData.duration} onChange={(e)=> handleChange(e)} type="text"/>

                            <label htmlFor="">Password</label> <br />
                            <input name="password" value={formData.password} onChange={(e)=> handleChange(e)} type="Password"/>

                            <button className="btn">{isLoading?  <span className="fas fa-spinner spin"></span> : "Submit" }</button>
                        </form>
                    </div>     
                </div>       
            </div>
        </div>
    )
}