import { toast } from "react-toastify"

const  Msg = ({ msg }) => {
    return (
        <>
            {
                msg.split(',').map(m => (
                    <div key={msg+Math.random(1000)}>
                        {m}
                    </div>
                ))
            }
        </>
    );
}



export const errorHandler = (error) =>{

    if(error.response) {
       const toastId = "my-error-toast"
        const { status } = error.response;
        const {msg} = error.response.data

        // if(status === 400) {
        //     let errormsg = ""
        //     error.response.data.error.forEach(error => {
        //         errormsg += error.msg + ',';
        //     });
             
        //     console.log(errormsg);
        //     toast.error(<Msg msg={errormsg}/>)

        // }
         
        if(!toast.isActive(toastId)){
            toast.dismiss()
            console.log(toastId)
            if(status === 400){
                const m = error.response.data.error[0].msg
                toast.error(m, {toastId})
            }
        
            if(status=== 404) {
                toast.error(msg , {toastId})
            }
            if(status === 401) {
                toast.error(msg , {toastId})
            }
            if(status === 409) {
                toast.error(msg , {toastId})
            }
        }     
       
    } else {
        toast.info(error.message);
    }
}