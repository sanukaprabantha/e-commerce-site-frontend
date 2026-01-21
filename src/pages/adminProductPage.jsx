import axios from "axios";
import { useEffect, useState } from "react";
import { FaEdit, FaRegPlusSquare, FaRegTrashAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

function ProductDeleteconfirm(props){
  const productid=props.productId;
  const close=props.close;

function deleteProduct(){
  axios.delete(
    import.meta.env.VITE_API_URL + "/api/product/" + productid,
    {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }
  )
  .then(() => {
    console.log("Product deleted successfully");
    close();
  })
  .catch((error) => {
    console.error("Failed to delete product", error);
  });
}


  return (<div className="fixed left-0 top-0 w-full h-screen bg-[#00000050] z-[100]  flex justify-center items-center">
      <div className="w-[500px] h-[200px] bg-white flex flex-col relative justify-center items-center gap-[40px]"> 
          <button className="w-[40px] h-[40px] bg-red-900 absolute top-[-42px] right-[-42px] text-white font-bold rounded-xl flex justify-center items-center hover:bg-red-800"
            onClick={close}>
                X
          </button>
          <p className="text-xl font-semibold">Are you sure you want to delete the product with product ID {productid}?</p>
          <div className="flex flex-row gap-[100px]">
            <button className="w-[100px] bg-accent"
            onClick={deleteProduct}>
              Yes</button>
            <button className="w-[100px] bg-red-700"
            onClick={close}>
              No</button>
          </div>
      </div>
  </div>
  )
}

export default function AdminProductPage() {
  const [products, setProducts] = useState([]);
  const [isDeleteConfirmVisible, setIsDeleteConfirmVisible] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState(null);
  const [isLoading,setIsLoading]=useState(true);

  const navigate = useNavigate();


  useEffect(() => {
    if (isLoading){
      axios
      .get(import.meta.env.VITE_API_URL + "/api/product/")
      .then((response) => {
        console.log(response.data);
        setProducts(response.data);
        setIsLoading(false);
      });
    }
   }, [isLoading]);

  return (
    <div className="w-full h-full p-5 bg-primary">
       {
        //prop comes as a close function in call of component
        isDeleteConfirmVisible && <ProductDeleteconfirm productId={productIdToDelete}  close={() => setIsDeleteConfirmVisible(false)} />
       }
      <Link
        to="/admin/addProduct"
        className="fixed right-[50px] bottom-[50px] text-5xl"
      >
        <FaRegPlusSquare className="hover:text-accent" />
      </Link>

      <div className="w-full bg-white rounded-xl shadow-md border border-accent/30 overflow-hidden">
        <div className="px-6 py-4 bg-secondary text-primary text-lg font-semibold">
          Product List
        </div>

        {isLoading?<p>Loading</p>:
        <table className="w-full text-center text-secondary">
          <thead className="bg-accent/40 text-secondary font-semibold">
            <tr>
              <th className="py-3">Image</th>
              <th className="py-3">Product ID</th>
              <th className="py-3">Product Name</th>
              <th className="py-3">Product Price</th>
              <th className="py-3">Category</th>
              <th className="py-3">Stock</th>
              <th className="py-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((item) => {
              return (
                <tr
                  key={item.productId}
                  className="hover:bg-accent/20 transition-all border-b border-accent/20"
                >
                  <td className="py-3">
                    <img
                      src={item.images?.[0] || "/placeholder.png"}
                      className="w-16 h-16 rounded-lg object-cover mx-auto shadow"
                      alt={item.name}
                    />
                  </td>

                  <td className="py-3 text-sm">{item.productId}</td>
                  <td className="py-3 font-medium">{item.name}</td>
                  <td className="py-3 text-sm">{item.labelPrice}</td>
                  <td className="py-3 text-sm">{item.category}</td>
                  <td className="py-3 text-sm">{item.stock}</td>

                  <td className="py-3">
                    <div className="flex flex-row gap-6 justify-center items-center">
                      <FaRegTrashAlt className="cursor-pointer text-secondary hover:text-red-500 hover:scale-110 transition ease-in-out" 
                        onClick={()=>{
                          setProductIdToDelete(item.productId);
                          setIsDeleteConfirmVisible(true);
                        }}
                        
                      />

                      <FaEdit
                        className="cursor-pointer text-secondary hover:text-accent hover:scale-110 transition ease-in-out"
                        onClick={() => {
                          navigate("/admin/updateProduct", {
                            state:item
                          });
                        }}
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>}
      </div>
    </div>
  );
}
