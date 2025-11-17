import { Link } from "react-router-dom";
export default function Header()
{
    return(
        <div className="w-full h-[100px] bg-accent text-white px-[20px] flex">
            <div className="w-full h-full flex relative">
                <img src="/logo.png" className="h-full absolute  object-cover"/>
                <div className="h-full w-[500px] flex absolute justify-center items-center gap-[60px] text-l right-1 ">
                    <Link to="/">Home</Link>
                    <Link to="/products">Products</Link>
                    <Link to="/about">About</Link> 
                    <Link to="/contact">Contact</Link>
                </div>
            </div>
        </div>   
    )
}