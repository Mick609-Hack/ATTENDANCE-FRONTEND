import React from "react"
import Header from "../components/header"
import DashNav from "./dashnav"
import Appointments from "./dashappointments"
import {Outlet} from "react-router-dom"

export default function Dashboard(){
    return(
        <div>
            <div>
                <DashNav/>
                <Outlet/>
            </div>
        </div>   
    )
}