import { CiCircleChevDown, CiCircleChevUp } from "react-icons/ci";
import loadCart, { getTotal } from "../utils/cart";

export default function CartPage()
{
    const cart=loadCart();
    return(
        <div className="w-full h-[calc(100vh-100px)] bg-primary flex flex-col pt-[25px] items-center p-12 gap-6">
           <div className="w-[400px] flex flex-col gap-6">
                {
                    cart.map((item,index)=>{
                        return(
                            <div className="w-full h-[100px] bg-white rounded-2xl shadow-lg flex gap-6 p-4 items-center" key={index}>
                                <img src={item.image} className="h-full w-[80px] object-cover rounded-2xl aspect-square object-cover"/>
                                <div className="w-[250px] h-full flex flex-col pl-[5px] pt-[10px ]"> 
                                    <h1 className="font-semibold text-lg w-full text-wrap">{item.name}</h1>
                                    <span className="text-sm text-secondary">{item.productId}</span>
                                </div>
                                <div className="w-[100px] h-full flex flex-col justify-center items-center">
                                    <CiCircleChevUp className="text-3xl" />
                                    <span className="font-semibold">{item.quantity}</span>
                                    <CiCircleChevDown className="text-3xl" />
                                </div>
                                <div className="w-[180px] h-full flex flex-col justify-center">
                                    <span className="w-full text-sm text-accent ">LKR{item.price.toFixed(2)}</span>
                                </div>
                            </div>

                        )
                    })
                }
                <div className="w-full h-[120px] bg-white flex">
                   <div className="w-[100px] h-[50px] flex  ">
                        <span className="text-2xl font-semibold text-accent pr-[10px] mt-[50px] w-full" >Total:LKR{getTotal()}</span>
                   </div> 
                </div>
           </div>
        </div>
    )
}