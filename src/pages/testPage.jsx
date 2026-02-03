import { createClient } from "@supabase/supabase-js"
import { useState } from "react"

export default function TestPage()
{
    const[file,setFile]=useState(null)

    async function uploadImage()
    {
       const link= await mediaUpload(file);
       console.log(link);
    }
    return(
        <div>
            
        </div>
    )
}