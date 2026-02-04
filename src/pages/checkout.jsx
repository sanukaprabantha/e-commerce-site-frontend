import { CiCircleChevDown, CiCircleChevUp } from "react-icons/ci";
import { FaRegTrashAlt } from "react-icons/fa";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

export default function CheckoutPage() {
  const location = useLocation();
  const [cart, setCart] = useState(location.state);
  const navigate = useNavigate();
  const [address,setAddress]=useState("");
  const [name,setName]=useState("");

  function getTotal() {
    let total = 0;
    cart.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total;
  }

  async function purchaseCart() {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to place an order.");
      navigate("/login");
      return;
    }
    try {
      const items = [];
      for (let i = 0; i < cart.length; i++) {
        items.push({
          productId: cart[i].productId,
          quantity: cart[i].quantity,
        });
      }

      await axios.post(
        import.meta.env.VITE_API_URL + "/api/orders",
        {
          address:address,
          customerName:name==""?null:name,
          items: items,
        },
        {
          Headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Order placed successfully");
    } catch (error) {
      toast.error("Failed to place order. Please try again.");
      console.error(error);

      if (error.response && error.response.status === 401) {
        const code = error.response.data.code;
        if (code === "stock") {
          toast.error(error.response.data.message);
        }
      }
    }
  }

  return (
    <div className="w-full lg:h-[calc(100vh-100px)] bg-primary flex flex-col pt-[25px] items-center p-12 gap-6 overflow-y-scroll">
      <div className="w-[300px] lg:w-[400px] flex flex-col gap-6">
        {cart.map((item, index) => {
          return (
            <div
              key={index}
              className="w-full h-[300px] lg:h-[100px] bg-white rounded-2xl shadow-lg
                         flex flex-col lg:flex-row gap-6 p-4 items-center relative"
            >
              <button
                className="absolute top-2 right-2 text-xl font-bold p-[5px]
                           text-accent right-[-30px]
                           hover:bg-red-500 hover:text-amber-50"
              >
                <FaRegTrashAlt />
              </button>

              <img
                src={item.image}
                className="h-[100px] lg:h-full w-[80px]
                           object-cover rounded-2xl aspect-square"
              />

              <div className="w-full lg:w-[250px] h-[100px] lg:h-full
                              flex flex-col justify-center items-center lg:items-start">
                <h1 className="font-semibold text-lg text-center lg:text-left">
                  {item.name}
                </h1>
                <span className="text-sm text-secondary">
                  {item.productId}
                </span>
              </div>

              <div className="w-full lg:w-[100px] h-[100px] lg:h-full
                              flex flex-row lg:flex-col justify-center items-center">
                <CiCircleChevUp
                  className="text-3xl"
                  onClick={() => {
                    const newCart = [...cart];
                    newCart[index].quantity += 1;
                    setCart(newCart);
                  }}
                />
                <span className="font-semibold">{item.quantity}</span>
                <CiCircleChevDown
                  className="text-3xl"
                  onClick={() => {
                    const newCart = [...cart];
                    if (newCart[index].quantity > 1) {
                      newCart[index].quantity -= 1;
                    }
                    setCart(newCart);
                  }}
                />
              </div>

              <div className="w-[180px] h-full flex flex-col justify-center">
                <span className="w-full text-sm text-accent text-center">
                  LKR {item.price.toFixed(2)}
                </span>
              </div>
            </div>
          );
        })}

        <div className="w-full lg:w-full  bg-white rounded-2xl shadow-lg
                     flex flex-col  justify-center items-center
                     gap-4 px-8">
            <div className="w-full flex flex-col gap-2 p-4 bg-white rounded-xl shadow-sm">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-secondary"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full h-[50px] border border-secondary/40 rounded-lg px-4 
                            focus:outline-none focus:ring-2 focus:ring-secondary/40 
                            transition"
                />
            </div>

            <div className="w-full flex flex-col gap-2 p-4 bg-white rounded-xl shadow-sm">
                <label
                  htmlFor="address"
                  className="text-sm font-medium text-secondary"
                >
                  Shipping Address
                </label>
                <textarea
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="House No, Street, City, Postal Code"
                  className="w-full h-[150px] border border-secondary/40 rounded-lg px-4 py-3 
                            resize-none focus:outline-none focus:ring-2 focus:ring-secondary/40 
                            transition"
                />
            </div>
            

        </div>

        {/* Total Section */}
        <div
          className="w-[300px] lg:w-full h-[200px] bg-white rounded-2xl shadow-lg
                     flex flex-col lg:flex-row justify-center items-center
                     gap-4 px-8">
          <div className="flex flex-col text-center">
            <span className="text-sm text-secondary uppercase tracking-wide">
              Total Amount
            </span>
            <span className="text-3xl font-bold text-accent">
              LKR {getTotal().toFixed(2)}
            </span>
          </div>

          <button
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
  );
}
