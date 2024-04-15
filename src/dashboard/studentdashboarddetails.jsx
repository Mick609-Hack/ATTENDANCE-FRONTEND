import React from "react"
import Details from "./details"

export default function StudentDashboardDetails(){
    return(
        <div>
            <div className="studentdashboardright">
                <div className="details">
                    <div className="welcome">
                        <h3>Welcome Michael! Here Are Your Details</h3>
                    </div>
                    <Details/>
                </div>       
            </div>
        </div>
    )
}