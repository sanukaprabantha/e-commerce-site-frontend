import axios from "axios";
import { useState } from "react";

export default function LoginPage() {
  const [emalil, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function login() {
    const response = await axios.post(
      import.meta.env.VITE_API_URL + "/api/users/login",
      {
        email: emalil,
        password: password,
      }
    );
    console.log(response.data);
  }

  return (
    <div className="w-full h-screen bg-[url('/bgimg.jpg')] bg-cover bg-center flex items-center    relative">

      {/* LEFT SIDE TEXT (only added part) */}
      <div className=" gap-8 flex flex-col  bg-secondary/40  w-[50%] h-full justify-center p-20">
        <h1 className="text-5xl font-bold tracking-wide text-primary drop-shadow-xl ">
         <span className="text-[#757575]"> Crystal</span> <span className="text-accent">Beauty</span> <span className="text-[#757575]">Clear</span>
        </h1>

        <p className="text-primary/90 mt-4 text-lg  leading-relaxed">
          Crystal Beauty Clear celebrates the art of self-care and modern beauty. We believe every person deserves to feel confident, radiant, and uniquely themselves. Our collection of cosmetics and skincare is crafted to enhance natural charm with gentle ingredients, elegant textures, and timeless style. From daily essentials to luxurious beauty moments, we help you embrace your glow and express your true beauty with clarity and confidence.
        </p>
      </div>

      <div className="w-[50%] h-full  bg-secondary/40 flex items-center justify-end  relative">

        {/* Right side / Login Card */}
        <div className="w-full max-w-md mr-20 p-10 bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 flex flex-col items-center gap-4 absolute right-[100px] ">

          {/* Logo */}
          <img
            src="/logo.png"
            alt="CBC Logo"
            className="w-32 drop-shadow-xl"
          />

          {/* Title */}
          <h1 className="text-3xl font-semibold tracking-wide text-primary drop-shadow-md">
            Welcome Back
          </h1>

          {/* Input Fields */}
          <div className="flex flex-col w-full gap-5">
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email Address"
              className="w-full h-12 px-4 rounded-xl bg-white/70 text-secondary shadow-md focus:outline-none focus:ring-2 focus:ring-accent transition-all"
            />

            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              className="w-full h-12 px-4 rounded-xl bg-white/70 text-secondary shadow-md focus:outline-none focus:ring-2 focus:ring-accent transition-all"
            />
          </div>

          {/* Login Button */}
          <button
            onClick={login}
            className="w-40 h-12 rounded-xl bg-accent text-secondary font-semibold text-lg shadow-lg hover:bg-accent/80 hover:scale-105 active:scale-95 transition-all"
          >
            Login
          </button>

        </div>
      </div>
    </div>
  );
}
