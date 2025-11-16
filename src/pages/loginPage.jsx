 export default function LoginPage()
 {
     return(
         <div className="w-full h-full bg-[url('/bgimg.jpg')] bg-cover bg-center flex">
            <div className="w-[50%] h-full"></div>
            <div className="w-[50%] h-full flex justify-center items-center">
                <div className="w-[500px] h-[500px] backdrop-blur-lg shadow-2xl rounded-2xl flex flex-col justify-center items-center gap-[5px]">
                    <input className="w-[400px] h-[40px] bg-amber-50"></input>
                    <input className="w-[400px] h-[40px] bg-amber-50"></input>
                    <button className="bg-amber-600 w-[400px] h-[40px]">Log in</button>
                </div>
            </div>
             
         </div>
     )
 }