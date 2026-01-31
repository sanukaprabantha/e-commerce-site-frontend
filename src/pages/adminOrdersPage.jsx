import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader } from "../components/loader";
import OrderDetailsModal from "../components/orderDetailsModal";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      axios
        .get(import.meta.env.VITE_API_URL + "/api/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setOrders(response.data);
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
        });
    }
  }, [isLoading, navigate]);

  return (
    <div className="w-full h-full p-5 bg-primary">
      <OrderDetailsModal
        isModelOpen={isModalOpen}
        selectedOrder={selectedOrder}
        closeModel={() => setIsModalOpen(false)}
      />

      <div className="w-full bg-white rounded-xl shadow-md border border-accent/30 overflow-hidden">
        {isLoading ? (
          <Loader />
        ) : (
          <table className="w-full text-center text-secondary">
            <thead className="bg-accent/40 font-semibold">
              <tr>
                <th className="py-3">Order ID</th>
                <th className="py-3">Items</th>
                <th className="py-3">Customer</th>
                <th className="py-3">Email</th>
                <th className="py-3">Phone</th>
                <th className="py-3">Address</th>
                <th className="py-3">Total</th>
                <th className="py-3">Status</th>
                <th className="py-3">Date</th>
                <th className="py-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((item) => (
                <tr
                  key={item.orderId}
                  className="border-b border-accent/20 hover:bg-accent/20 transition"
                >
                  <td className="py-3 text-sm">{item.orderId}</td>
                  <td className="py-3">{item.items.length}</td>
                  <td className="py-3 text-sm">{item.customerName}</td>
                  <td className="py-3 text-sm">{item.email}</td>
                  <td className="py-3 text-sm">{item.phone}</td>
                  <td className="py-3 text-sm">{item.address}</td>
                  <td className="py-3 font-medium">
                    LKR {item.total.toFixed(2)}
                  </td>
                  <td className="py-3 text-sm">{item.status}</td>
                  <td className="py-3 text-sm">
                    {new Date(item.date).toLocaleDateString()}
                  </td>
                  <td className="py-3">
                    <button
                      className="px-4 py-1 rounded-md bg-accent/40 hover:bg-accent/60 transition text-sm"
                      onClick={() => {
                        setSelectedOrder(item);
                        setIsModalOpen(true);
                      }}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
