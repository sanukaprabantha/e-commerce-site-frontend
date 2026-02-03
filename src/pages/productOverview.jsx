import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { Link, useLocation, useParams } from "react-router-dom"
import { Loader } from "../components/loader"
import ImageSlider from "../components/imageSlider"
import { addToCart } from "../utils/cart"


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
        <div className="w-full lg:h-[calc(100vh-180px)]">
            {
                status == "loading" && <Loader/>
            }
            {
                status == "success" && 
                <div className="w-full   flex flex-col lg:flex-row p-10 lg:p-0">
                    <h1 className="text-3xl font-extrabold text-center text-secondary leading-snug lg:hidden">
                        {product.name}
                    </h1>
                    <div className="w-full lg:w-[50%] h-full flex justify-center items-center">
                        <ImageSlider images={product.images}/>
                    </div>
                    <div className="w-full  lg:w-[50%] flex flex-col items-center gap-6 p-12 bg-white rounded-2xl shadow-lg">
  
                    {/* Product ID */}
                    <span className="text-sm tracking-widest text-secondary/60">
                        {product.productId}
                    </span>

                    {/* Product Name + Alt Names */}
                    <h1 className="text-3xl font-extrabold text-center text-secondary leading-snug">
                        {product.name}
                        {
                        product.altNames.map((name, index) => {
                            return (
                            <span
                                key={index}
                                className="text-base font-normal text-secondary/70"
                            >
                                {"  | " + name}
                            </span>
                            )
                        })
                        }
                    </h1>

                    {/* Description */}
                    <p className="mt-4 text-justify text-secondary/80 leading-relaxed max-w-[90%]">
                        {product.description}
                    </p>

                    {/* Category */}
                    <span className="px-4 py-1 text-sm rounded-full bg-primary text-secondary font-medium">
                        {product.category}
                    </span>

                    {/* Price */}
                    <p className="text-2xl font-bold text-secondary">
                        Rs {product.labelPrice.toFixed(2)}
                    </p>

                    {/* Buttons */}
                    <div className="w-full flex gap-4 mt-4">
                        <button className="flex-1 bg-accent text-white py-3 rounded-xl font-semibold hover:opacity-90 transition"
                            onClick={()=>{
                                addToCart(product,1)
                                toast.success("Added to cart")
                            }}
                        >
                        Add to Cart
                        </button>

                        <Link
                            to="/checkout"
                            state={[{
                                image: product.images[0],
                                name: product.name,
                                productId: product.productId,
                                price: product.labelPrice,
                                quantity: 1
                            }]}
                            className="flex-1 bg-secondary text-white py-3 rounded-xl font-semibold hover:opacity-90 transition flex justify-center items-center">
                            Buy Now
                        </Link>

                    </div>

                    </div>

                </div>
            }
            {
                status == "error" && <h1>Failed to load product details.</h1>
            }
        </div>
    )
}