import { Route, Routes } from "react-router-dom";
import Header from "../components/header";

export default function HomePage()
{
    return(
        <div className="w-full h-full bg-primary">
                <Header/>
                <Routes path="/">
                    <Route path="/" element={<h1>This is home page</h1>}/>
                    <Route path="/products" element={<h1>Product List</h1>}/>
                    <Route path="/contact" element={<h1>Contact us</h1>}/>
                    <Route path="/about" element={<h1>About us</h1>}/>
                    <Route path="/*" element={<h1>404 not found</h1>}/>
                </Routes>
        </div>
    )
}