export default function loadCart()
{
    let cartString=localStorage.getItem("cart"); // cart is stored as a JSON string
     
    if(cartString==null)
    {
        localStorage.setItem("cart","[]");
       
    }
     let  cart=JSON.parse(cartString);// convert the string(cartString) in local storage into array
   
    return cart;
   
}
export function addToCart(product,quantity){
    const cart = loadCart();
    const existingItemIndex = cart.findIndex(
        (item )=> {
            return item.productId === product.productId
        }
    );
    if (existingItemIndex == -1) {
        // Item not in cart
        if(quantity<1){
            console.log("Quantity must be at least 1");
            return;
        }

        const cartItem = {
            productId: product.productId,
            name: product.name,
            price: product.labelPrice,
            image: product.images[0],
            quantity: quantity

        }
        cart.push(cartItem);
    }
    else{
        // Item already in cart
        const existingItem = cart[existingItemIndex];
        const newQuantity = existingItem.quantity + quantity;
        if(newQuantity<1){
            cart = cart.fileter((item)=>{
                return item.productId !== product.productId
            });
        }
        else{
            existingItem.quantity = newQuantity;
        }
    }
    localStorage.setItem("cart",JSON.stringify(cart));
}

export function getTotal()
{
    const cart = loadCart()
    let total=0
    cart.forEach((item)=>{
        total += item.price * item.quantity;
    })
    return total;
}