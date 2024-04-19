import { toast } from "react-toastify"


export const successHandler = (data) =>{
    
    if(data.data) {
        const toastId = "my-error-toast"
        const { status } = data;
        const {msg} = data.data

        if(!toast.isActive(toastId)){
            toast.dismiss()
            if(status=== 200) {
                toast.success(msg , {toastId})
            }
            if(status === 201) {
                toast.success(msg , {toastId})
            }
       }
    } else {
        toast.info(data.message);
    }
}
