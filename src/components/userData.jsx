import axios from "axios";
import { useEffect, useState } from "react";
import { Loader } from "./loader";

export default function UserData() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token != null) {
      axios
        .get(import.meta.env.VITE_API_URL + "/api/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setUser(res.data);
          setLoading(false);
        })
        .catch(() => {
          localStorage.removeItem("token");
          setUser(null);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <div className="flex items-center justify-center min-w-[150px]">
      {/* Loader */}
      {loading && (
        <div className="w-[28px] h-[28px] border-2 border-white border-b-transparent rounded-full animate-spin" />
      )}

      {/* User */}
      {user && !loading && (
        <div className="flex items-center gap-3 bg-primary/40 px-3 py-2 rounded-full border border-white/60 shadow-sm">
          <img
            src={user.image}
            alt="user"
            className="w-[38px] h-[38px] rounded-full object-cover border-2 border-white"
          />

          <span className="text-secondary font-medium text-sm">
            {user.firstName}
          </span>

          <select
            className="bg-transparent text-secondary text-sm outline-none cursor-pointer"
          >
            <option value=""></option>
            <option>Account Settings</option>
            <option>Orders</option>
            <option>Logout</option>
          </select>
        </div>
      )}

      {/* Login Button */}
      {!loading && user === null && (
        <a
          href="/login"
          className="px-5 py-2 rounded-full border border-white text-white text-sm font-medium hover:bg-white hover:text-secondary transition-all duration-200 shadow-sm"
        >
          Login
        </a>
      )}
    </div>
  );
}
