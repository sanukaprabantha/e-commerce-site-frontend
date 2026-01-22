import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useParams } from "react-router-dom"
import { Loader } from "../components/loader"


export default function ProductOverview(){

    const params=useParams()
   
    //loading,success,error states
    const [status,setStatus]=useState("loading")
    const [product,setProduct]=useState(null)

    useEffect(()=>{
            axios.get(import.meta.env.VITE_API_URL + "/api/product/"+params.id).then(
                (res)=>{
                    setProduct(res.data);
                    setStatus("success");
                }  
            ).catch(()=>{
                toast.error("Failed to load product details");
                setStatus("error")
            })
        },[])
    return(
        <div className="w-full h-[calc(100vh-180px)]">
            {
                status == "loading" && <Loader/>
            }
            {
                status == "success" && 
                <div className="w-full h-full  flex">
                    <div className="w-[50%] h-full bg-amber-300"></div>
                    <div className="w-[50%] h-full bg-amber-900"></div>
                </div>
            }
            {
                status == "error" && <h1>Failed to load product details.</h1>
            }
        </div>
    )
}