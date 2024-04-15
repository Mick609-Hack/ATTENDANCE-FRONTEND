import React, {useState , useEffect} from "react"
import {Outlet} from "react-router-dom"
import { NavLink ,  useLocation } from "react-router-dom"
import { myAxios } from "../config/api"
import { errorHandler } from "../errorHandler/errorhandler"
import { successHandler } from "../successHandler/successhandler"


export default function Records(){
    const currentDate = new Date().toISOString()
    const formattedDate = currentDate.split("T")[0]

    const api = myAxios()
    const location = useLocation()
    const [currentPath, setCurrentPath] = useState(location.pathname);
    const [records, setRecords] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [date, setDate] = useState(formattedDate) 
    useEffect(() => {
        setCurrentPath(location.pathname);
    }, [location.pathname]);

    useEffect(() => {
        api.get(`/dashboard/records/${date}`)
            .then(data => {
                console.log(data);
                setTimeout(()=>{
                    setIsLoading(false)
                },1000)
                successHandler(data)
                 setRecords([...data.data.data]);
                 
            }).catch(error => {
                console.log(error);
                setRecords([])
                setTimeout(()=>{
                    setIsLoading(false)
                },1000)
                errorHandler(error)
            });
    }, [isLoading]);

    return(
        <div>
        
            {currentPath === "/dashboard/records" &&
            <div>
                <div className="recordhead">
                    <div className="left">
                        <h3>Attendance</h3>
                        <p>Month - March</p>
                    </div>
                    <div className="middle">
                        <h2>RECORDS</h2>
                    </div>
                    <div className="right">
                        <label htmlFor="">Date:</label>
                        <input value={date} onChange={(e)=> setDate(e.target.value) + setIsLoading(true)} type="date" />
                    </div>
                </div>
                <div className="recordbody">
                    <div className="recordheader">
                            <ul>
                                <li>Id</li>
                                <li>Student</li>
                                <li>Date</li>
                                <li>Check-in Time</li>
                                <li>Check-out Time</li>
                                <li>Details</li>
                            </ul>
                    </div>
                    {records.map(records=>(
                    <div className="record" key={records.id}>
                            <span>{records.user.reg_id}</span>
                            <span>{records.user.firstname} {records.user.lastname}</span>
                            <span>{records.date}</span>
                            <span>{records.createdAt}</span>
                            <span>{records.updatedAt}</span>
                            <span><button className="status"><NavLink to={`details/${records.userId}`}>View</NavLink></button></span>
                    </div> 
                    ))}
                </div>
            </div>
            }
            <Outlet/>
           
        </div>
        
    )
}

