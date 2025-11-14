export default function ProductCard(props)
{
    console.log("product card is displaying")
    console.log(props)
    return(
        <div>
            <h2>{props.name}</h2>
            <p>{props.price}</p>
            <img src={props.image}/>
        </div>
    )
        
    
}