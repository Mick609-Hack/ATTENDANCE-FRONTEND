// import { useEffect} from "react"
import axios from 'axios';
import { useAuthContext } from '../hooks/useAuthContext';
import {useNavigate} from "react-router-dom"
import { errorHandler } from '../errorHandler/errorhandler';


export const myAxios = ()=>{
    const {user, dispatch} = useAuthContext()
    const navigate = useNavigate()

    const instance =  axios.create({
    //    baseURL: 'http://localhost:5000',
         baseURL: 'https://attendance-platform.onrender.com',
        timeout: 5000
    });
    
    instance.interceptors.request.use((config) => {
        if(config.url === "/login"){
            return config
        }
        if(config.url === "/signup"){
            return config
        }
        if(user.user && user.user.email && user.user.role ) {
            config.headers["Authorization"] = `Bearer ${user.access_token}`;
        }
    
        return config;
    
    }, (error) => {
        return Promise.reject(error);
    });
    
    instance.interceptors.response.use((response) => {
        return response;
    }, (error) => {
    
        if(error.response && error.response.status === 401){ 
            console.log('dddddddddd');
            errorHandler(error)
             dispatch({type:"LOGOUT"})
             localStorage.removeItem("user")
        }
        return Promise.reject(error);
    });
    return instance   
}





















// const api = () => {
//     const { user } = useAuthContext();

//     useEffect(() => {
//         const instance = axios.create({
//             baseURL: 'http://localhost:5000',
//             timeout: 5000
//         });

//         const requestInterceptor = instance.interceptors.request.use((config) => {
//             if (user && user.email && user.role) {
//                 config.headers["Authorization"] = `Bearer ${user.token}`;
//             }

//             return config;

//         }, (error) => {
//             return Promise.reject(error);
//         });

//         const responseInterceptor = instance.interceptors.response.use((response) => {
//             return response;
//         }, (error) => {

//             if (error.response && error.response.status === 401) {
//                 console.log('Unauthorized error');
//                 // Redirect or handle unauthorized error here
//                 window.location.reload(); // Example: Reload the page
//             }
//             return Promise.reject(error);
//         });

//         // Clean up interceptors on unmount
//         return () => {
//             axios.interceptors.request.eject(requestInterceptor);
//             axios.interceptors.response.eject(responseInterceptor);
//         };

//     }, [user]);

//     // Return null or any other component if needed
//     return instance;
// }

// export default api;