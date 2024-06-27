import React, {useState, useEffect} from "react"
import { NavLink, useLocation } from "react-router-dom"
import Linkify from 'react-linkify';
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
    const [test, setTest] = useState("");
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
                                    <Linkify>{announce.announcetext}</Linkify>
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















































// Ignore This LOL

//  const linkRegEx = "(https:\/\/www\. |http:\/\/www\. |https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})(\.[a-zA-Z0-9]{2,})?"
    // const link = data.data.data.match(linkRegEx)
    // const linkedResponse = data.replace(linkRegEx, `<a href="${link}>${link}</a>`)
     
    // const linkRegEx = /https?:\/\/[^\s]+/g;
    // const newAnnouncements = []
    
    // announcements.forEach(announce=>{
    //     const link = announce.announcetext.match(linkRegEx)

    //     if (link){
    //             console.log("yessssss")
    //             // console.log(link)
    //             const linkedResponse = announce.announcetext.replace(linkRegEx, `<a href="${link}>${link}</a>`)
    //             //  console.log(announcements)
    //              newAnnouncements.push()
    //         }else{
    //             console.log("nadaaaaaaa")
    //         }

    //     // if(link){
    //     //     const linkedResponse = announce.announcetext.replace("boy", `<a href="fuckkkkkk${link[0]}>${link[0]}</a>`) 
    //     //     //  console.log(linkedResponse)
    //     //     announce.announcetext = linkedResponse
    //     //     // console.log(announce.announcetext)
    //     //      const linkObj = {link_key : linkedResponse}
    //     //      newAnnouncements.push(linkObj);
    //     // }
    // })
    //         announcements.push(...newAnnouncements);
    