import React, {useState, useEffect} from "react"
import { myAxios } from "../config/api";
import Announcement from "./dashannounce"


export default function StudentAnnounce(){    
    return(
        <div>
            <div className="studentdashboardright">
                <div className="details">
                    <div className="welcome">
                        <h3>Hello Michael! Here Are The Available Announcements</h3>
                    </div>
                    <Announcement/>
                </div>       
            </div>
        </div>
    )
}