import { Route, Routes } from "react-router-dom";
import Header from "../components/header";
import { Productpage } from "./productPage";
import ProductOverview from "./productOverview";
import CartPage from "./cart";

export default function HomePage()
{
    return(
        <div className="w-full h-full bg-primary">
                <Header/>
                <Routes path="/">
                    <Route path="/" element={<Productpage/>}/>
                    <Route path="/products" element={<h1>Product List</h1>}/>
                    <Route path="/contact" element={<h1>Contact us</h1>}/>
                    <Route path="/about" element={<h1>About us</h1>}/>
                    <Route path="/*" element={<h1>404 not found</h1>}/>
                    <Route path="/overview/:id" element={<ProductOverview/>}/>
                    <Route path="/cart" element={<CartPage/>}/>
                </Routes>
        </div>
    )
}