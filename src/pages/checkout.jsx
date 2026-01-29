import { CiCircleChevDown, CiCircleChevUp } from "react-icons/ci";

import { FaRegTrashAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function CheckoutPage()
{
    const location = useLocation();
    const [cart,setCart] = useState(location.state)
    const navigate = useNavigate();

    function getTotal(){
        let total=0
        cart.forEach((item)=>{
            total += item.price * item.quantity;
        });
        return total;
    }

    async function purchaseCart(){
        const token = localStorage.getItem("token");
        if(!token){
            toast.error("Please login to place an order.");
            navigate("/login");
            return;
        }
        try{
            const items=[]
            for(let i=0;i<cart.length;i++){
                items.push(
                    {
                        productId:cart[i].productId,
                        quantity:cart[i].quantity
                    }
                )
            }
            await axios.post(import.meta.env.VITE_API_URL + "/api/orders",{
                address:"haliela,badulla",
                items:items
            },{
                Headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            toast.success("Order placed successfully");
        }catch(error){
            toast.error("Failed to place order. Please try again.");
            console.error(error);

            //if error is 401, navigate to login
            if(error.response && error.response.status === 401){
                const code = error.response.data.code;
                if(code=="stock"){
                    toast.error(error.response.data.message);
                }
            }
        }
    }

    return(
        <div className="w-full h-[calc(100vh-100px)] bg-primary flex flex-col pt-[25px] items-center p-12 gap-6">
           <div className="w-[400px] flex flex-col gap-6">
                {
                    cart.map((item,index)=>{
                        return(
                            <div className="w-full h-[100px] bg-white rounded-2xl shadow-lg flex gap-6 p-4 items-center relative" key={index}>
                                <button className="absolute top-2 right-2 text-xl font-bold p-[5px] text-accent right-[-30px] hover:bg-red-500 hover:text-amber-50" onClick={
                                    ()=>{
                                       
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
                                           const newCart=[...cart]// asign the copy of the cart
                                             newCart[index].quantity +=1
                                             setCart(newCart)
                                        }
                                    }/>
                                    <span className="font-semibold">{item.quantity}</span>
                                    <CiCircleChevDown className="text-3xl" onClick={
                                        ()=>{
                                            const newCart=[...cart]// asign the copy of the cart
                                              
                                            if(newCart[index].quantity>1){
                                               newCart[index].quantity -=1
                                              
                                            }
                                            setCart(newCart)
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
                        onClick={purchaseCart}
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