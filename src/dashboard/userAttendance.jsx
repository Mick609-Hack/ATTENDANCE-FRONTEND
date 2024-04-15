import {React, useEffect, useState} from "react"
import {useParams} from "react-router-dom"
import Records from "./dashrecords"
import { errorHandler } from "../errorHandler/errorhandler";
import { myAxios } from "../config/api";
import { successHandler } from "../successHandler/successhandler";

export default function UserAttendance(){
    const api = myAxios()
    const{userId} = useParams()
    const [userRecords, setUserRecords] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    console.log(userId)
    useEffect(() => {
        api.get(`/dashboard/records/details/${userId}/attendance/${userId}`)
            .then(data => {
                console.log(data , "olorun miii");
                setTimeout(()=>{
                    setIsLoading(false)
                },1000)
                successHandler(data)
                 setUserRecords([...data.data.data]);
            
            }).catch(error => {
                console.log(error);
                setUserRecords([])
                setTimeout(()=>{
                    setIsLoading(false)
                },1000)
                errorHandler(error)
            });
    }, []);

    console.log(userRecords)
    return(
        <>
            <div>
                <div className="recordhead">
                    <div className="left">
                        <h3>Attendance For: </h3>
                        {<p>{userRecords.length ===0 ? "" : " " + userRecords[0].user.firstname + " " + userRecords[0].user.lastname}</p> }
                    </div>
                    <div className="middle">
                        <h2>PERSONAL RECORDS</h2>
                    </div>
                    <div className="right">
                        <label htmlFor="">Total:</label>
                        <p>{userRecords.length ===0 ? "" : userRecords.length}</p>
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
                            </ul>
                    </div>
                    {userRecords.map(records=>(
                    <div className="record" key={records.id}>
                            <span>{records.user.reg_id}</span>
                            <span>{records.user.firstname} {records.user.lastname}</span>
                            <span>{records.date}</span>
                            <span>{records.createdAt}</span>
                            <span>{records.updatedAt}</span>
                    </div> 
                    ))}
                </div>
            </div>
        </>
    )
}