import { useState } from "react";
import { IoCartOutline } from "react-icons/io5";
import { MdMenu } from "react-icons/md";
import { Link } from "react-router-dom";
export default function Header()
{

    const [isSideBarOpen,setIsSideBarOpen]=useState(false);

    return(
        <div className="w-full h-[100px] bg-accent text-white px-[20px] flex">
            <div className="w-full h-full  flex relative">
                <img src="/logo.png" className=" lg:flex  hidden h-full absolute  object-cover w-[90px]"/>
                <div className="lg:hidden w-full relative flex justify-center items-center">
                    <MdMenu
                            className="aboslute left-0 text-3xl"
                            onClick={()=>setIsSideBarOpen(true)}
                    /> 
                    <img src="/logo.png" className=" lg:hidden h-full   object-cover w-[90px]"/>
                </div>
                
                <div className="hidden lg:flex h-full w-[500px] flex absolute justify-center items-center gap-[60px] text-l right-1 ">
                    <Link to="/">Home</Link>
                    <Link to="/products">Products</Link>
                    <Link to="/about">About</Link> 
                    <Link to="/contact">Contact</Link>
                </div>
                <div className="hidden lg:flex">
                    <Link to="/cart" className="h-full absolute right-0 text-3xl flex justify-center items-center"><IoCartOutline/></Link>
                </div>
            </div>
        </div>   
    )
}
