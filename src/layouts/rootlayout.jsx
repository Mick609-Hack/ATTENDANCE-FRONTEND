import React from "react";
import Header from "../components/header";
import {Outlet, useLocation} from "react-router-dom"

export default function RootLayout(){
  const location = useLocation()
  const currentPath = location.pathname
    return(
        <div>
            <Header
               headerdivstyle= {{ backgroundColor: currentPath === "/dashboard" ? "#35386f": "white" }}
               headerintrostyle= {{ backgroundColor: currentPath === "/dashboard"? "white": "#35386f" , Color: currentPath === "/dashboard"? "#35386f":"white"}}
              />

            <main>
                <Outlet/>
            </main>
        </div>
    )
}