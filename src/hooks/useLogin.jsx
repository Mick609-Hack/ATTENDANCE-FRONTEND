import { myAxios } from "../config/api";
import { errorHandler } from "../errorHandler/errorhandler";
import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () =>{
    const api = myAxios()
    const [isLoading , setIsLoading] = useState(null)
    const {dispatch , user} = useAuthContext()

    const login =  async (email,password) =>{
         api.post('/login', {
            email, 
            password
        })     
        .then(({ data }) => {
            console.log(data, "data");
            localStorage.setItem("user" , JSON.stringify(data))
            
            dispatch({type:"LOGIN" , payload: data})
            
        }
        )
        .catch(error=>{
        console.log(error);
        errorHandler(error)
        });
    }

    return {login ,isLoading }
}

