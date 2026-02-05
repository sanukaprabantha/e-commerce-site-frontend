import { Link,Route, Routes, useNavigate } from "react-router-dom";
import { FaChartLine, FaRegUser} from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { RiProductHuntLine } from "react-icons/ri";
import AdminProductPage from "./adminProductPage";
import AddProductPage from "./adminAddNewProduct";
import UpdateProductPage from "./adminUpdateProduct";
import AdminOrdersPage from "./adminOrdersPage";
import { useEffect } from "react";
import { Loader } from "../components/loader";


export default function AdminPage()
{

    const [userLoaded,setUserLoaded]=useState(false);   
    const navigate=useNavigate();

    useEffect(()=>{

        const token=localStorage.getItem("token");
        if(!token)
        {
            toast.error("Please login to access admin panel.");
            navigaate("/login");
            return;
        }
        axios.get(import.meta.env.VITE_API_URL+"/api/auth/me",{
            headers:{
                Authorization:`Bearer ${token}`,
            },
        }).then((response)=>{
            if(response.data.role!=="admin")
            {
                toast.error("You are not authorized to access admin panel.");
                navigate("/");
                return;
            }
            setUserLoaded(true);
        }).catch((error)=>{
            toast.error("Failed to load user data.");
            localStorage.removeItem("token");
            navigate("/login");
        })
    },[])

    return(
        <div className="w-full h-full bg-accent flex p-2">
            <div className="w-[300px] h-full bg-accent gap-[20px]">
                <div className="w-[90%] h-[70px]  flex items-center bg-primary border-secondary border-2 ml-1 rounded-2xl">
                    <img src="/logo.png" className="h-full object-cover ml-5"/>
                    <span className="text-secondary text-xl ml-4 text-">Admin panel</span>
                </div>
                <Link to="/admin" className="w-[90%] flex items-center gap-4 p-4 mt-10 ml-1 hover:bg-amber-50 rounded-lg">
                    <FaChartLine/>
                    Dashboard
                </Link>
                <Link to="/admin/orders" className="w-[90%] flex items-center gap-4 p-4 mt-5 ml-1 hover:bg-amber-50 rounded-lg">
                    <IoCartOutline />
                    Orders
                </Link>
                <Link to="/admin/products" className="w-[90%] flex items-center gap-4 p-4 mt-5 ml-1 hover:bg-amber-50 rounded-lg">
                    <RiProductHuntLine />
                    Products
                </Link>
                <Link to="/admin/users" className="w-[90%] flex items-center gap-4 p-4 mt-5 ml-1 hover:bg-amber-50 rounded-lg">
                    <FaRegUser />
                    Users
                </Link>
            </div>
            <div className="w-[calc(100%-300px)] h-full bg-primary rounded-2xl overflow-hidden">
                <div className="w-full h-full max-w-full max-h-full overflow-y-scroll">
                    {userLoaded?<Routes path="/">
                        <Route path="/" element={<h1>Dashboard</h1>}/>
                        <Route path="/products" element={<AdminProductPage/>}/>
                        <Route path="/users" element={<h1>Users</h1>}/>
                        <Route path="/orders" element={<AdminOrdersPage/>}/>  
                        <Route path="/addProduct" element={<AddProductPage/>}/>
                        <Route path="/updateProduct" element={<UpdateProductPage/>}/>
                    </Routes>:<Loader/>}
                </div>
                
            </div>
        </div>
    )
}