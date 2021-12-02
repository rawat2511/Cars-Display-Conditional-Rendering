
const style = {
    height: "160px",
    width: "200px",
    border: "2px solid blak",
    borderRadius: "20px"
}

function Card( {name, type, year, price, src} ) {
    return (
        <div style={{border: "2px solid black", borderRadius: "28px", margin: "20px 40px"}}>
            <h1>{name}</h1>
            <h3>{type} - {year}</h3>
            <p style={{fontWeight: "bold"}}>Rs. {price}</p>
            <img style={style} src={src} alt={name} />
        </div>
    )
}

export default Card;