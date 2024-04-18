import React, {useState, useEffect} from "react"
import { myAxios } from "../config/api";
import Announcement from "./dashannounce"
import { useAuthContext } from "../hooks/useAuthContext";


export default function StudentAnnounce(){    
    const {user} = useAuthContext()
    const currentUser = user.user
    return(
        <div>
            <div className="studentdashboardright">
                <div className="details">
                    <div className="welcome">
                        <h3>Hello {currentUser.firstname}! Here Are The Available Announcements</h3>
                    </div>
                    <Announcement/>
                </div>       
            </div>
        </div>
    )
}