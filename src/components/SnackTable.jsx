import "./snackTable.css";
import { useContext } from "react";

import { SnackContext } from "../context/SnackContext";

export const SnackTable=()=>
{
    const {state,dispatch,sortById,sortByProductWeight,sortByProductPrice,sortByProductCalories}=useContext(SnackContext);
    const {search,snackList:snacks}=state;
    return (
        <div>
            <h1>Snack Table</h1>
            <input value={search} type="search" placeholder="Search with Products" onChange={(e)=>dispatch({type:"SEARCH_INPUT",payload:e.target.value})}></input>
            <table className="table">
                <thead>
                    <tr>
                    <th onClick={()=>sortById()}>ID</th>
                    <th >Product Name</th>
                    <th onClick={()=>sortByProductWeight()}>Product Weight</th>
                    <th onClick={()=>sortByProductPrice()}>Price</th>
                    <th onClick={()=>sortByProductCalories()}>Calories</th>
                    <th>Ingredients</th>
                    </tr>
                </thead>
                <tbody>
                    {snacks.map((snack) => (
                    <tr key={snack.id}>
                        <td>{snack.id}</td>
                        <td>{snack.product_name}</td>
                        <td>{snack.product_weight}g</td>
                        <td>{snack.price}</td>
                        <td>{snack.calories}</td>
                        <td>{snack.ingredients.join(", ")}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
            
        </div>
    )
}