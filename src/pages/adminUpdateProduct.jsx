import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import mediaUpload from "../utils/mediaUpload";
import toast from "react-hot-toast";
import axios from "axios";

export default function UpdateProductPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ FIX: get product correctly
  const product = location.state;

  if (!product) {
    navigate("/admin/products");
    return null;
  }

  const [productId] = useState(product.productId);
  const [name, setName] = useState(product.name);
  const [altNames, setAltNames] = useState(product.altNames.join(","));
  const [description, setDescription] = useState(product.description);
  const [images, setImages] = useState([]); 
  const [labelPrice, setLabelPrice] = useState(product.labelPrice);
  const [category, setCategory] = useState(product.category);
  const [stock, setStock] = useState(product.stock);

  async function updateProduct() {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      let urls = product.images; // ✅ KEEP OLD IMAGES

      // ✅ Upload only if new images selected
      if (images.length > 0) {
        const promises = [];
        for (let i = 0; i < images.length; i++) {
          promises.push(mediaUpload(images[i]));
        }
        urls = await Promise.all(promises);
      }

      const alternativeNames = altNames.split(",");

      const updatedProduct = {
        productId,
        name,
        altNames: alternativeNames,
        description,
        images: urls,
        labelPrice,
        category,
        stock,
      };

      await axios.put(
        import.meta.env.VITE_API_URL + "/api/product/" + productId,
        updatedProduct,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      toast.success("Product updated successfully");
      navigate("/admin/products");
    } catch (error) {
      console.error(error);
      toast.error("Product update failed");
    }
  }

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-primary">
      <div className="w-[650px] bg-white rounded-2xl shadow-xl border border-accent p-8">

        <h2 className="text-2xl font-bold text-secondary mb-6 text-center">
          Update Product
        </h2>

        <div className="grid grid-cols-2 gap-4">

          <input
            disabled
            value={productId}
            className="col-span-2 px-4 py-2 border rounded-lg"
          />

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Product Name"
            className="px-4 py-2 border rounded-lg"
          />

          <input
            value={altNames}
            onChange={(e) => setAltNames(e.target.value)}
            placeholder="Alternative Names"
            className="px-4 py-2 border rounded-lg"
          />

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="col-span-2 px-4 py-2 border rounded-lg resize-none"
          />

          <input
            type="file"
            multiple
            onChange={(e) => setImages(e.target.files)}
            className="col-span-2"
          />

          <input
            type="number"
            value={labelPrice}
            onChange={(e) => setLabelPrice(e.target.value)}
            className="px-4 py-2 border rounded-lg"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-2 border rounded-lg bg-white"
          >
            <option value="cream">Cream</option>
            <option value="lotion">Lotion</option>
            <option value="serum">Serum</option>
          </select>

          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="col-span-2 px-4 py-2 border rounded-lg"
          />
        </div>

        <div className="flex justify-end gap-4 mt-8">
          <button
            onClick={() => navigate("/admin/products")}
            className="px-6 py-2 rounded-lg border border-secondary text-secondary"
          >
            Cancel
          </button>

          <button
            onClick={updateProduct}
            className="px-6 py-2 rounded-lg bg-accent text-secondary font-semibold"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
