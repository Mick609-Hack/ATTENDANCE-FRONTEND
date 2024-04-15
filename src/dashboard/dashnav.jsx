import React, {useState , useEffect} from "react"
import Modal from "react-modal"
import { NavLink , useLocation } from "react-router-dom"
import { myAxios } from "../config/api"
import { errorHandler } from "../errorHandler/errorhandler"
import { useAuthContext } from "../hooks/useAuthContext"
import { successHandler } from "../successHandler/successhandler"

const MyModal = (props) =>{
    const api = myAxios()
    const [ regId, setRegId ] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();    
        console.log(regId)
        {props.action === "Check_in" &&
            api.post("/check_in" ,{
                regId
            })
            .then(data =>{
                console.log(data)
                successHandler(data)
                setTimeout(()=>{
                    window.location.reload()
                    setRegId("")
                },1000)
                
            })
            .catch(error=>{
                console.log(error);
                errorHandler(error)
            });
         }
         {props.action === "Check_out" &&
            api.put("/check_out",{
                regId
            })
            .then(data =>{
                console.log(data)
                successHandler(data)
              
                setTimeout(()=>{
                    window.location.reload()
                    setRegId("")
                },1000)
                
                
            })
            .catch(error=>{
                console.log(error);
                errorHandler(error)
            });
         }  
    }
    return(
        <div>
                <Modal
                    className = "modal"
                    isOpen={props.open}
                    onRequestClose={props.close}
                >
                        <h2>{props.action}</h2>
                        <input placeholder="Enter Student ID"
                            type="text"
                            value={regId}
                            onChange={(e) => setRegId(e.target.value)} 
                        /> <br />

                        <button onClick={(e) => handleSubmit(e)}>Submit</button>
                
                </Modal>
        </div>
   
    )
}

export default function DashNav(){
    const {dispatch} = useAuthContext()
    const api = myAxios()
    const [modalOpen , setModalOpen] = useState(false)
    const [action, setAction] = useState("")
    const location = useLocation()
    const [currentPath, setCurrentPath] = useState(location.pathname);
    const [isLoading, setIsLoading] = useState(true);
    const [details, setDetails] = useState("")

    const currentDate = new Date()
    const options = {day:"numeric" , month: "long", year: "numeric"}
    const formattedDate = currentDate.toLocaleDateString('en-US', options)

    const openModal = (action) =>{
        setModalOpen(true)
        setAction(action)
    }

    const closeModal = () =>{
        setModalOpen(false)
    }

    const handleLogout = async (e) => {
        dispatch({type:"LOGOUT"})
        localStorage.removeItem("user")
    }

    useEffect(() => {
        setCurrentPath(location.pathname);
    }, [location.pathname]);

    useEffect(() => {
        api.get("getDashboardDetails")
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
                //  errorHandler(error)
        });
    },[isLoading]);
    
    return( 
        <div>
                <MyModal 
                    ariaHide= {false}
                    open = {modalOpen}
                    close = {closeModal}
                    action = {action}
                />

            {
                currentPath === "/dashboard" && ( 
                    <>
                    {
                    isLoading ? (<div>
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
                                    <div className="navbox skeleton"></div>
                                </div>) : 
                            (
                                <div>
                                    <div className="title">
                                        <div className="left">
                                            <div className="roundan">
                                            <span className="an fas fa-bullhorn"></span>
                                            </div>
                                            <div className="roundantext">
                                                <h2>Today, {formattedDate}</h2>
                                                <p>This Shows Daily Data In Real Time</p>
                                            </div>
                                            
                                        </div>
                                        <div className="right">
                                            <div className="users">
                                                <h5>Total Students</h5>
                                                <div className="spn">
                                                    <span>{details.users? details.users : 0 }</span><span className="fas fa-user"></span>
                                                </div>
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

                                            <div className="post">
                                                <button> <NavLink to = "announcement">Make a post</NavLink><span className="fas fa-pencil-alt"></span></button>
                                                
                                            </div>

                                        </div>
                                    </div>
                                    <div className="navbox">
                                        <div className="buttons">
                                            <button onClick={()=>openModal("Check_out")} className="checkoutbtn" >Check Out <span className="fas fa-arrow-alt-circle-down"></span></button>
                                            <button onClick={()=>openModal("Check_in")} className="checkinbtn">Check in <span className="fas fa-arrow-alt-circle-up"></span></button>
                                        </div>
                                        <div className="appointments">
                                            <button  className="appointmentbtn" ><span className="far fa-calendar-alt"></span><NavLink to = "appointments">APPOINTMENTS</NavLink></button>  
                                        </div>
                                        <div className="records">
                                            <button className="recordbtn" ><span className="fas fa-clipboard-list"></span><NavLink to = "records">RECORDS</NavLink></button>  
                                        </div>
                                        <div className="logout">
                                            <button onClick={(e)=> handleLogout(e)} className="logoutbtn" ><span className="fas fa-sign-out-alt"></span>LOGOUT </button>  
                                        </div>
                                    </div>
                                </div>
                            )
                    }
                    </>
                )
                
            }
                
            
            
            
        </div>
    )
}