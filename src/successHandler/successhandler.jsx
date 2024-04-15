import { toast } from "react-toastify"


export const successHandler = (data) =>{
    
    if(data.data) {
         console.log(data.status , "statuss")
         console.log(data.data.msg , "msg")
        const { status } = data;
        const {msg} = data.data

        if(status=== 200) {
            toast.success(msg)
        }
        if(status === 201) {
            toast.success(msg)
        }
    } else {
        toast.info(data.message);
    }
}
