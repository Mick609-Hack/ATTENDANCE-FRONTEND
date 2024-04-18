import { myAxios } from "../config/api";
import { errorHandler } from "../errorHandler/errorhandler";
import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () =>{
    const api = myAxios()
    const [isLoading , setIsLoading] = useState(false)
    const {dispatch , user} = useAuthContext()

    const login =  async (email,password) =>{
         setIsLoading(true)
         api.post('/login', {
            email, 
            password
        })     
        .then(({ data }) => {
            console.log(data, "data");
            localStorage.setItem("user" , JSON.stringify(data))
            
            dispatch({type:"LOGIN" , payload: data})
            setIsLoading(false)
            
        }
        )
        .catch(error=>{
        console.log(error);
        errorHandler(error)
        setTimeout(()=>{
            setIsLoading(false)
        },100)
         
        });
    }

    return {login ,isLoading }
}

