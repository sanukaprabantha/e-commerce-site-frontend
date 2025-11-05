export default function ProductCard(props)
{
    console.log("product card is displaying")
    console.log(props)
    return(
        <div>
            <h1>{props.name}</h1>
            <p>{props.price}</p>
            <img src={props.image}/>
        </div>
    )
        
    
}