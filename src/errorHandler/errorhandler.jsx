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
         
         
        if(status === 400){
            const m = error.response.data.error[0].msg
            toast.error(m)
        }
    
        if(status=== 404) {
            toast.error(msg)
        }
        if(status === 401) {
            toast.error(msg)
        }
        if(status === 409) {
            toast.error(msg)
        }
        // if(status === 200 ) {
        //     toast.success(msg)
        //  }
    } else {
        toast.info(error.message);
    }
}