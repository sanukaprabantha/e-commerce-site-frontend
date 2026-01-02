import { useState } from "react";
import { useNavigate } from "react-router-dom";
import mediaUpload from "../utils/mediaUpload";
import toast from "react-hot-toast";
import axios from "axios";

export default function AddProductPage() {
  const [productId, setProductId] = useState("");
  const [name, setName] = useState("");
  const [altNames, setAltNames] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [labelPrice, setLabelPrice] = useState();
  const [category, setCategory] = useState("cream");
  const [stock, setStock] = useState();

  const navigate=useNavigate();

  async function addProduct(){
      const  token=localStorage.getItem("token");
      if(!token){
        navigate("/login");
        return;
      }

      const promises=[]
      for(let i=0;i<images.length;i++){
        promises[i]=mediaUpload(images[i])
      }
      try{
        const urls=await Promise.all(promises);
        const alternativeNames=altNames.split(",");
        console.log(urls);

        const product={
          productId:productId,
          name:name,
          altNames:alternativeNames,  
          description:description,
          images:urls,
          labelPrice:labelPrice,
          category:category,
          stock:stock
        }

        console.log(product);
        await axios.post(import.meta.env.VITE_API_URL+"/api/product",product,{
          headers:{
            Authorization:"Bearer "+token
          }
        })
        toast.success("Product added successfully");
        navigate("/admin/products");

      }catch{
        toast.error("Image upload failed");
        return;
      }

     
  }

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-primary">
      <div className="w-[650px] bg-white rounded-2xl shadow-xl border border-accent p-8">
        
        {/* Title */}
        <h2 className="text-2xl font-bold text-secondary mb-6 text-center">
          Add New Product
        </h2>

        {/* Form */}
        <div className="grid grid-cols-2 gap-4">

          <input
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            placeholder="Product ID"
            className="col-span-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
          />

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Product Name"
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
          />

          <input
            value={altNames}
            onChange={(e) => setAltNames(e.target.value)}
            placeholder="Alternative Names"
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
          />

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Product Description"
            rows={3}
            className="col-span-2 px-4 py-2 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-accent"
          />

          <input
            type="file"
            onChange={(e) => setImages(e.target.files)}
            multiple
            className="col-span-2 file:mr-4 file:py-2 file:px-4 
                       file:rounded-lg file:border-0
                       file:bg-accent file:text-secondary
                       hover:file:bg-accent/80"
          />

          <input
            type="number"
            value={labelPrice}
            onChange={(e) => setLabelPrice(e.target.value)}
            placeholder="Label Price"
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-2 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <option value="cream">Cream</option>
            <option value="lotion">Lotion</option>
            <option value="serum">Serum</option>
          </select>

          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            placeholder="Stock Quantity"
            className="col-span-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-8">
          <button onClick={()=>{
            navigate("/admin/products")
          }}
            className="px-6 py-2 rounded-lg border border-secondary text-secondary 
                       hover:bg-secondary hover:text-white transition"
          >
            Cancel
          </button>

          <button onClick={addProduct}
            className="px-6 py-2 rounded-lg bg-accent text-secondary font-semibold 
                       hover:bg-accent/80 transition"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
