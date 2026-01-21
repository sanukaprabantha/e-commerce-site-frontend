export default function ProductCard(props)
{
    const product=props.product;
    return(
        <div className="w-[300px] h-[400px] shadow-2xl m-3 flex flex-col px-[10px] rounded-2xl">
            <img className="w-full h-[250px] object-cover" src={product.images[0]}/>
            <h1 className="text-l text-secondary font-bold">{product.name}</h1>
            <p className="text-accent text-lg font-bold">LKR{product.labelPrice}</p>
            <p className="text-sm text-secondary/70">{product.productId}</p>
            <p className="text-sm text-secondary/70">{product.category}</p>
            <button className="w-full h-[30px] border border-accent text-accent hover:bg-accent hover:text-white mt-2">View Product</button>
        </div>
    )
        
    
}
