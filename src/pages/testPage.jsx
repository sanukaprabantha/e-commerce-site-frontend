import { useState } from "react"
export default function TestPage()
{
    const[count,setCount]=useState(150)
    return(
    
        <div className=" w-full h-full flex justify-center items-center">
            <div className="w-[500px] h-[500px] bg-amber-100 text-white flex justify-center items-center gap-[20px]">
                <button onClick={()=>
                    {
                        setCount(200)
                    }
                } className="bg-accent w-[100px] h-[40px]">+</button>
                <span className="text-accent text-5xl">{count}</span>
                <button onClick={()=>
                    {
                        setCount(100)    
                    }
                } className="bg-accent w-[100px] h-[40px]">-</button>
            </div>
        </div>
    )
}