const style = {
    outline: "none",
    border: "none",
    color: "white",
    fontWeight: "bold",
    padding: "10px 28px",
    margin: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer"
}

function Button({color, title, func}) {
    return (
        <button style={{...style, backgroundColor: color }} onClick={() => func()} >{title}</button>
    )
}

export default Button;