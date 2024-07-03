import {createContext, useReducer, useEffect, useState } from "react";
import { AuthReducer } from "../reducers/AuthReducer";

export const AuthContext = createContext({ user: null })

const hydrateUser = () => {
    
    const user = localStorage.getItem("user")

    if(!user){
       return {
        user: null
       };
    }

    const parsedUser = JSON.parse(user);
    return parsedUser.user;
}
export default function AuthContextProvider({children}){
    const [authState, dispatch] = useReducer(AuthReducer, hydrateUser())
    const [isAuthenticated, setIsAuthenticated] = useState(false)
   
    //  console.log("authcontextstate" , authState)
    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem("user"))
        if(user){
            dispatch({type:"LOGIN" , payload: user })
            setIsAuthenticated(true)
        }
    },[])
    return (
        <AuthContext.Provider value={{...authState, dispatch , isAuthenticated}}>
            {children}
        </AuthContext.Provider>
    )
}

