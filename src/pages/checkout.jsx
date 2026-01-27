import { CiCircleChevDown, CiCircleChevUp } from "react-icons/ci";
import loadCart, { addToCart, getTotal } from "../utils/cart";
import { FaRegTrashAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function CheckoutPage()
{
    const location = useLocation();
    const [cart,setCart] = useState(location.state)


    return(
        <div className="w-full h-[calc(100vh-100px)] bg-primary flex flex-col pt-[25px] items-center p-12 gap-6">
           <div className="w-[400px] flex flex-col gap-6">
                {
                    cart.map((item,index)=>{
                        return(
                            <div className="w-full h-[100px] bg-white rounded-2xl shadow-lg flex gap-6 p-4 items-center relative" key={index}>
                                <button className="absolute top-2 right-2 text-xl font-bold p-[5px] text-accent right-[-30px] hover:bg-red-500 hover:text-amber-50" onClick={
                                    ()=>{
                                        addToCart(item,-item.quantity)
                                        setCart(loadCart())
                                    }
                                }><FaRegTrashAlt/></button>
                                <img src={item.image} className="h-full w-[80px] object-cover rounded-2xl aspect-square object-cover"/>
                                <div className="w-[250px] h-full flex flex-col pl-[5px] pt-[10px ]"> 
                                    <h1 className="font-semibold text-lg w-full text-wrap">{item.name}</h1>
                                    <span className="text-sm text-secondary">{item.productId}</span>
                                </div>
                                <div className="w-[100px] h-full flex flex-col justify-center items-center">
                                    <CiCircleChevUp className="text-3xl" onClick={
                                        ()=>{
                                            addToCart(item,1)
                                            setCart(loadCart())
                                        }
                                    }/>
                                    <span className="font-semibold">{item.quantity}</span>
                                    <CiCircleChevDown className="text-3xl" onClick={
                                        ()=>{
                                            addToCart(item,-1)
                                            setCart(loadCart())
                                        }
                                    } />
                                </div>
                                <div className="w-[180px] h-full flex flex-col justify-center">
                                    <span className="w-full text-sm text-accent ">LKR{item.price.toFixed(2)}</span>
                                </div>
                            </div>

                        )
                    })
                }
                <div className="w-full h-[200px] bg-white rounded-2xl shadow-lg flex items-center justify-between px-8 relative gap-">

                    {/* Total Section */}
                    <div className="flex flex-col">
                        <span className="text-sm text-secondary uppercase tracking-wide">
                            Total Amount
                        </span>
                        <span className="text-3xl font-bold text-accent">
                            LKR {getTotal().toFixed(2)}
                        </span>
                    </div>

                    {/* Checkout Button */}
                    <button
                        to="/checkout"
                        className="bg-accent text-white px-8 py-4 rounded-2xl font-semibold text-lg
                                shadow-md hover:shadow-xl hover:bg-accent/90
                                transition-all duration-300"
                    >
                      Order
                    </button>

                </div>

           </div>
        </div>
    )
}