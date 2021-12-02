import {useState, useEffect} from 'react';
import axios from 'axios';
import Card from "./Card";
import Button from "./Button";

import {v4 as uuid} from "uuid";

const style = {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)"
}

function Cars ({title}) {

    const [cars, setCars] = useState([]);

    const [yearAbove, setYearAbove] = useState(0);
    
    const [filter, setFilter] = useState({
        price: "random",
        type: "All",
        year: 0
    });


    const typeCar = (title) => {
        setFilter( {...filter, type: title} );
    }
    
    const carsData = async () => {
        const res = await axios.get("http://localhost:8000/cars");
        return res.data;
    }

   const orderByPrice = (title) => {
       setFilter({...filter, price: title})
   }

   const setYear = () => {
       setFilter({...filter, year: yearAbove})
   }

    useEffect( () => {
        const res = async () => {
            const data = await carsData();
            if(data){
                setCars(data);
            }
        }

        res();
        
    }, [])

    const updateYear = (e) => {
        setYearAbove( e.target.value );
    }

    return (
        <div>
            <h1>Cars in Sale:-</h1>

            <Button color="violet" title="All" func={() => typeCar("All")}/>
            <Button color="violet" title="SUV" func={() => typeCar("SUV")}/>
            <Button color="violet" title="Hatchback" func={() => typeCar("Hatchback")}/>

            <div>
                Sort By Price - 
                <Button color="palevioletred" title="lowToHigh" func={() => orderByPrice("lowToHigh")} />
                <Button color="palevioletred" title="highToLow" func={() => orderByPrice("highToLow")} />
            </div>

            <div>
                <input value={yearAbove} type="number" onChange={updateYear} placeholder="Year Above" />
                <Button color="blue" func={() => setYear()} title="Apply" />
            </div>

            <div style={style}>
                {
                    
                    cars
                    .sort((a,b) => {
                        if(filter.price === "lowToHigh"){
                            return a.price - b.price;
                        }
                        else if(filter.price === "highToLow"){
                            return b.price - a.price;
                        }
                        else{
                            return 0;
                        }
                    })
                    .filter((car) => {
                        if(filter.type === "All"){
                            return car;
                        }
                        else if(car.type === filter.type){
                            return car;
                        }
                        else{
                            return null;
                        }
                    })
                    .filter( (car) => car.year >= filter.year )
                    .map(
                        car => {
                            const {name, type, year, price, image} = car;
                            return <Card 
                            key={uuid()} 
                            name={name} type={type} year={year} price={price} src={image} />
                        }
                    )
                }
            </div>
        </div>
    )

}

export default Cars;