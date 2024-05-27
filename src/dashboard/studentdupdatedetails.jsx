import React, { useState} from "react"
import { myAxios } from "../config/api";
import { useNavigate } from "react-router-dom"
import { successHandler } from "../successHandler/successhandler";
import { errorHandler } from "../errorHandler/errorhandler";
import { useAuthContext } from "../hooks/useAuthContext";

export default function StudentUpdateDetails(){
    const api = myAxios()
    const navigate = useNavigate();
    const {user , dispatch} = useAuthContext()
    const currentUser = user.user
    const [isLoading, setIsLoading] = useState(false);
    const [file, setFile] = useState({})
    const [formData, setFormData] = useState({
        firstname:"" , lastname:"" , email:"" , school:"", phone_no:"" , course:"", location:"" , duration:"", regId: currentUser.reg_id, password:""
     })
  
     const {firstname,lastname,email,school,phone_no,course,location,duration,password} = formData


     function handleChange(e){
        if (e.target.name === "image") {
            setFile({
                [e.target.name]: e.target.files[0]
            });
        }else{
            setFormData(prevFormData =>{
                return{
                    ...prevFormData,
                    [e.target.name] : e.target.value
                }

            })
        }
   }

   const handleSubmit = (e) => {
        e.preventDefault();
        const mainFormData = new FormData()
         setIsLoading(true)
        
         Object.entries(formData).forEach(([key, value]) => {
            mainFormData.append(key, value);
        });

        mainFormData.append("file", file.image);

        console.log(mainFormData)
        api.put("/updateuserdetails",
            mainFormData,
        //    firstname, lastname,email, school, phone_no, course, location,duration,password,
        {
          headers:{'Content-Type' : 'multipart/form-data'} 
        }).then( data  => {
            console.log(data, "data");
            setIsLoading(false) 
            successHandler(data)
            setTimeout(() => {
                dispatch({type:"LOGOUT"})
                localStorage.removeItem("user")
            }, 1000);
         }
        )
        .catch(error=>{
            console.log(error);
            setIsLoading(false) 
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
                        <form onSubmit={(e) => handleSubmit(e)} className="form" encType="multipart/form-data" action="">
                        <h3>Update Details</h3>
                        <label htmlFor="">First Name</label> <br />
                        <input name="firstname" value={formData.firstname} onChange={(e)=> handleChange(e)} type="text" required/> <br />

                        <label htmlFor="">Last Name</label> <br />
                        <input name="lastname" value={formData.lastname} onChange={(e)=> handleChange(e)} type="text" required/><br />

                        <label htmlFor="">Email</label> <br />
                        <input name="email" value={formData.email} onChange={(e)=> handleChange(e)} type="email" required/><br />

                        <label htmlFor="">School (University/Polytechnic)</label> <br />
                        <input name="school" value={formData.school} onChange={(e)=> handleChange(e)} type="text" required/><br />

                        <label htmlFor="">Phone No</label> <br />
                        <input name="phone_no" value={formData.phone_no} onChange={(e)=> handleChange(e)} type="number" required/> <br />

                        <label htmlFor="">Registered Course</label> <br />
                        <input name="course" value={formData.course} onChange={(e)=> handleChange(e)} type="text" required/>

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
                        <input name="duration" value={formData.duration} onChange={(e)=> handleChange(e)} type="text" required/>

                        <label htmlFor="">Add Your Image</label> <br />
                        <input name="image"  onChange={(e)=> handleChange(e)} type="file" required/>

                        <label htmlFor="">Password</label> <br />
                        <input name="password" value={formData.password} onChange={(e)=> handleChange(e)} type="Password" required/>

                        <button className="btn">{isLoading?  <span className="fas fa-spinner spin"></span> : "Submit" }</button>
                    </form>
                    </div>     
                </div>       
            </div>
        </div>
    )
}