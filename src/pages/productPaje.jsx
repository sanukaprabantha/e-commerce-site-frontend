import axios from "axios";
import { use, useEffect, useState } from "react"
import toast from "react-hot-toast";
import { Loader } from "../components/loader";
import ProductCard from "../components/productCard";

export function Productpage(){
    const [products,setProducts]=useState([]);
    const [isLoading,setIsLoading]=useState(true);

    useEffect(()=>{
        if(isLoading){
            axios.get(import.meta.env.VITE_API_URL + "/api/product/").then(
                (response)=>{
                    console.log(response.data);
                    setProducts(response.data);
                    setIsLoading(false);
                }  
            ).catch((error)=>{
                console.error("Error fetching products:", error);
                setIsLoading(false);
                toast.error("Failed to load products");
            });
        }
    },[isLoading])
    return(
        <div className="w-full h-[calc(100vh-100px)]">
            {
                isLoading ? <Loader/> 
                :
                <div className="w-full h-full flex-row flex flex-wrap justify-center items-center overflow-y-scroll">
                    {
                        products.map((item)=>{
                            return(
                                <ProductCard key={item.productID} product={item}/>
                            )
                        })
                    }
                </div>
            }
        </div>
    )
}