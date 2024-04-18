import React, {useState, useEffect} from "react"
import { useLocation } from "react-router-dom"
import {myAxios} from "../config/api";
import { errorHandler } from "../errorHandler/errorhandler";

export default function Announcement(){
    
    const currentDate = new Date().toISOString()
    const formattedDate = currentDate.split("T")[0]

    const api = myAxios()
    const location = useLocation()
    const [currentPath, setCurrentPath] = useState(location.pathname);
    const [announcements, setAnnouncement] = useState([]);
    const [announceText, setAnnounceText] = useState("");
    const [announceHead, setAnnounceHead] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [date, setDate] = useState(formattedDate) 
 
    useEffect(() => {
        setCurrentPath(location.pathname);
    }, [location.pathname]);

    useEffect(() => {
        api.get(`/announcements/${date}`)
            .then(data => {
                console.log(data);
                setTimeout(()=>{
                    setIsLoading(false)
                },1000)
                 setAnnouncement([...data.data.data]);
                 
            }).catch(error => {
                console.log(error);
                setAnnouncement([])
                setTimeout(()=>{
                    setIsLoading(false)
                },1000)
                errorHandler(error)
            });
    }, [isLoading]);
   
    const handleSubmit = async (e) => {
        e.preventDefault();    
        console.log(announceHead, announceText)
        api.post("/createannouncement" ,{
            announceHead, 
            announceText
        })
        .then(data =>{
            console.log(data)
            setIsLoading(true)
            setAnnounceHead("")
            setAnnounceText("")
        })
        .catch(error => {
            console.log(error);
            errorHandler(error)
        });
        
    }

    return(
        <> 
          { isLoading?( 
                   <div className="spinbox">
                      <span className="fas fa-spinner spin"></span>
                   </div>
          )
          :
            (<div>
                <div className="announcehead">
                    <div className="announcehorn">
                        <span className="fas fa-bullhorn"></span>
                    </div> 
                    <div className="announceinput">
                            <h2>Announcements</h2> <br />
                            <input value={date} onChange={(e)=> setDate(e.target.value) + setIsLoading(true)} type="Date" />
                    </div>
                </div>

                <div className="announcebody">
                    <p>Dashboard - Announcements</p>
                    {announcements.map(announce=>(
                        <div className="announcecontent" key={announce.id}>
                            <div className="left">
                                <span>Today</span> <br/>
                                <span>{announce.createdAt}</span>
                            </div>
                            <div className="right">
                                <h3>{announce.announcehead}</h3>
                                <span>
                                    {announce.announcetext}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
                {currentPath === "/dashboard/announcement" && 
                    <div className="createannouncebox">
                        <input className="createannounceheader"   placeholder="Announcement Header Goes Here..." 
                            value={announceHead}
                            onChange={(e) => setAnnounceHead(e.target.value)} 
                            type="text"
                            required
                        />
                        <div className="createannounceinputbox">
                            <input className="createannounceinput"   placeholder="Aa"
                                value={announceText}
                                onChange={(e) => setAnnounceText(e.target.value)} 
                                type="text"
                            />
                            <button onClick={(e) => handleSubmit(e)} className="createannounceBtn"><span className="fas fa-paper-plane"></span></button>
                        </div>
                    </div>   
                }
            </div>
          )}
            
        </>
        
    )
}