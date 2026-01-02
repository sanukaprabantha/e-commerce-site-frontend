import { createClient } from "@supabase/supabase-js"

const anonkey="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNvcWx0dWFwc2pwZm9lb3dpbmloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY4NTMxODQsImV4cCI6MjA4MjQyOTE4NH0.BzRKgQBJ4-44YlWBFYbk8LX3JVeZOEJs2VvTQunC2Xo"
const supabaseUrl="https://coqltuapsjpfoeowinih.supabase.co"

const supabase= createClient(supabaseUrl,anonkey)



export default function mediaUpload(file){
    return new Promise((resolve,reject)=>{
        if(file===null){
            reject("No file selected");
        }else{
            const timestamp=new Date().getTime();
            const fileName=timestamp+file.name;
            supabase.storage.from('images').upload(fileName,file,{
                upsert:false,
                cacheControl:'3600',
            }).then(()=>
            {
                const publicUrl=supabase.storage.from("images").getPublicUrl(fileName)
                resolve(publicUrl.data.publicUrl);
            }
        ).catch(
            ()=>{
                reject("Upload failed");
            }
        )
        }
    })
}