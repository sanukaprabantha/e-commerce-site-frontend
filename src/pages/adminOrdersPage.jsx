import axios from "axios";
import { useEffect, useState } from "react";

import {  useNavigate } from "react-router-dom";
import { Loader } from "../components/loader";



export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  
  const [isLoading,setIsLoading]=useState(true);

  const navigate = useNavigate();


  useEffect(() => {
    if (isLoading){
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }
        axios
        .get(import.meta.env.VITE_API_URL + "/api/orders",{
            //send the token in the authorization header with api request
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((response) => {
            console.log(response.data);
            setOrders(response.data);
            setIsLoading(false);
        });
    }
   }, [isLoading]);

  return (
    <div className="w-full h-full p-5 bg-primary">

      <div className="w-full bg-white rounded-xl shadow-md border border-accent/30 overflow-hidden">
        
      
        {isLoading?<Loader/>:
        <table className="w-full text-center text-secondary">
          <thead className="bg-accent/40 text-secondary font-semibold">
            <tr>
              <th className="py-3">Order Id</th>
              <th className="py-3">Number of Items</th>
              <th className="py-3">Customer Name</th>
              <th className="py-3">Email</th>
              <th className="py-3">Phone</th>
              <th className="py-3">Address</th>
              <th className="py-3">Total</th>
              <th className="py-3">Status</th>
              <th className="py-3">Date</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((item) => {
              return (
                <tr
                  key={item.orderId}
                  className="hover:bg-accent/20 transition-all border-b border-accent/20"
                >
                  <td className="py-3 text-sm">{item.orderIdId}</td>
                  <td className="py-3 font-medium">{item.items.length}</td>
                  <td className="py-3 text-sm">{item.customerName}</td>
                  <td className="py-3 text-sm">{item.email}</td>
                  <td className="py-3 text-sm">{item.phone}</td>
                  <td className="py-3 text-sm">{item.address}</td>
                  <td className="py-3 font-medium">{'LKR ' + item.total.toFixed(2)}</td>
                  <td className="py-3 text-sm">{item.status}</td>
                  <td className="py-3 text-sm">{new Date(item.date).toLocaleDateString()}</td>
                  <td className="py-3">
                    <div className="flex flex-row gap-6 justify-center items-center">
                      
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>}
      </div>
    </div>
  );
}