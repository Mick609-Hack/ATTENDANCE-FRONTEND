import React from "react"
import Details from "./details"
import { useAuthContext } from "../hooks/useAuthContext"

export default function StudentDashboardDetails(){
    const {user} = useAuthContext()
    const currentUser = user.user
    return(
        <div>
            <div className="studentdashboardright">
                <div className="details">
                    <div className="welcome">
                        <h3>Welcome {currentUser.firstname}! Here Are Your Details</h3>
                    </div>
                    <Details/>
                </div>       
            </div>
        </div>
    )
}