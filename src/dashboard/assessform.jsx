import React, { useState, useEffect } from "react"
import { myAxios } from "../config/api";
import { errorHandler } from "../errorHandler/errorhandler";
import { successHandler } from "../successHandler/successhandler";
import { NavLink, useNavigate, useParams} from "react-router-dom";

export default function AssessForm(){
    const navigate = useNavigate()
    const{regId} = useParams()
    const api = myAxios()
    const [user , setUser] = useState({})
    // const [ regId, setRegId ] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [formData, setFormData] = useState({
        regId, EIAtt:"" , EIWebAtt:"" , ENTAtt:"", ENTWebAdd:"", ITTWAtt:"", AOS:"",Digital:"", Affiliate:"", Punctuality:"" , Workplace:""
     })
    
   

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

    function handleChange(e){
        setFormData(prevFormData =>{
            return{
                ...prevFormData,
                [e.target.name] : e.target.value
            }

        })
   }

    
    const handleSubmit = async (e) => {
         e.preventDefault()
        
            api.post("/studentassess",{
                formData
            })
                .then(data => {
                    console.log(data , "olorun miii");
                    setTimeout(()=>{
                        // setUser([...data.data.data])
                        setIsLoading(false)
                        setRegId("")
                    },1000)
                    successHandler(data)
                    navigate(`/dashboard/assessment`)
                
                
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
            
            <form onSubmit={(e) => handleSubmit(e)} className="assessformbox" action="">
                <div>
                    <p style={{marginLeft:"5%" , marginTop:"5%"}}>Please Input the grades for {user.firstname}</p>
                </div>
                <div className="assessform">
                    <div className="assessflex">
                        <div>
                            <label htmlFor="">EI Att</label> <br />
                            <input name="EIAtt" value={formData.EIAtt} onChange={(e)=> handleChange(e)} type="number" />
                        </div>
                        <div>
                            <label htmlFor="">EI Web Add</label> <br />
                            <input name="EIWebAtt" value={formData.EIWebAtt} onChange={(e)=> handleChange(e)} type="number" />
                        </div> 
                    </div>
                    <div className="assessflex">
                        <div>
                            <label htmlFor="">ENT Att</label> <br />
                            <input name="ENTAtt" value={formData.ENTAtt} onChange={(e)=> handleChange(e)} type="number" />
                        </div>
                        <div>
                            <label htmlFor="">ENT Web Add</label> <br />
                            <input name="ENTWebAdd" value={formData.ENTWebAdd} onChange={(e)=> handleChange(e)} type="number" />
                        </div> 
                       
                    </div>
                    <div className="assessflex">
                        <div>
                            <label htmlFor="">ITTW Att</label> <br />
                            <input name="ITTWAtt" value={formData.ITTWAtt} onChange={(e)=> handleChange(e)} type="number" />
                        </div>
                        <div>
                            <label htmlFor="">AOS (% of Success)20%</label> <br />
                            <input name="AOS" value={formData.AOS} onChange={(e)=> handleChange(e)} type="number" />
                        </div> 
                    </div>
                    <div className="assessflex">
                        <div>
                            <label htmlFor="">Digital Literacy Comp 5%</label> <br />
                            <input name="Digital" value={formData.Digital} onChange={(e)=> handleChange(e)} type="number" />
                        </div>
                        <div>
                            <label htmlFor="">Affiliate Role Conver 5%</label> <br />
                            <input name="Affiliate" value={formData.Affiliate} onChange={(e)=> handleChange(e)} type="number" />
                        </div>
                    </div>
                    <div className="assessflex">
                        <div>
                            <label htmlFor="">Punctuality at work 10%</label> <br />
                            <input name="Punctuality" value={formData.Punctuality} onChange={(e)=> handleChange(e)} type="number" />
                        </div>
                        <div>
                            <label htmlFor="">workplace Behavior 10%</label> <br />
                            <input name="Workplace" value={formData.Workplace} onChange={(e)=> handleChange(e)} type="number" />
                        </div>
                    </div>
                    
                    <button className="btn">Submit</button>
                </div>
            </form>
        </div>
    )
}