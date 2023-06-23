import { createContext, useReducer } from "react";

import {snacks} from "../db/snacks";

export const SnackContext=createContext();

export const SnackProvider=({children})=>
{
    const SnackReducer=(snack,{type,payload})=>
    {
        switch(type)
        {
            case "SEARCH_INPUT":
                return {...snack,search:payload};

            case "SORT_UPDATED":
                return {...snack,snackList:payload,ascending:!snack.ascending};      

            default:
                return snack;    
        }
    }
    const initialState= {
        search:"",
        snackList:[...snacks],
        ascending:true,

    }
    const [state,dispatch]=useReducer(SnackReducer,initialState);

    const sortById=()=>
    {

        const {snackList,ascending}=state;
        if(ascending===true)
        {
            const sortedElement=[...snackList].sort((a,b)=>a.id-b.id);
            dispatch({type:"SORT_UPDATED",payload:sortedElement});
        }
        else {
            const sortedElement=[...snackList].sort((a,b)=>b.id-a.id);
            dispatch({type:"SORT_UPDATED",payload:sortedElement});
        }
    }

    const sortByProductWeight=()=>
    {
        const {snackList,ascending}=state;
        if(ascending===true)
        {
            const sortedElement=[...snackList].sort((a,b)=>a.product_weight-b.product_weight);
            dispatch({type:"SORT_UPDATED",payload:sortedElement});
        }
        else {
            const sortedElement=[...snackList].sort((a,b)=>b.product_weight-a.product_weight);
            dispatch({type:"SORT_UPDATED",payload:sortedElement});
        }
    }

    const sortByProductPrice=()=>
    {
        const {snackList,ascending}=state;
        if(ascending===true)
        {
            const sortedElement=[...snackList].sort((a,b)=>a.price-b.price);
            dispatch({type:"SORT_UPDATED",payload:sortedElement});
        }
        else {
            const sortedElement=[...snackList].sort((a,b)=>b.price-a.price);
            dispatch({type:"SORT_UPDATED",payload:sortedElement});
        }
    }    
    
    const sortByProductCalories=()=>
    {
        const {snackList,ascending}=state;
        if(ascending===true)
        {
            const sortedElement=[...snackList].sort((a,b)=>a.calories-b.calories);
            dispatch({type:"SORT_UPDATED",payload:sortedElement});
        }
        else {
            const sortedElement=[...snackList].sort((a,b)=>b.calories-a.calories);
            dispatch({type:"SORT_UPDATED",payload:sortedElement});
        }
    }

    const sortByProductName=()=>
    {
        const {snackList,ascending}=state;
        if(ascending===true)
        {
            const sortedSnacks = [...snackList].sort((a, b) => {
                const productA = a.product_name.toLowerCase();
                const productB = b.product_name.toLowerCase();
                if (productA < productB) {
                  return -1;
                }
                if (productA > productB) {
                  return 1;
                }
                return 0;
              });

            dispatch({type:"SORT_UPDATED",payload:sortedSnacks});
        }
        else {
            
            const sortedSnacks = [...snackList].sort((a, b) => {
                const productA = a.product_name.toLowerCase();
                const productB = b.product_name.toLowerCase();
                if (productA > productB) {
                  return -1;
                }
                if (productA < productB) {
                  return 1;
                }
                return 0;
              });
            dispatch({type:"SORT_UPDATED",payload:sortedSnacks});
        }
    }


    const filterBySearch=()=>
    {
        const {snackList,search}=state;

        const searchedSnacks=[...snackList].filter(({product_name})=>(product_name.toLowerCase()).includes(search.toLowerCase()));
        return searchedSnacks;
    }

    return (
        <SnackContext.Provider value={{state,dispatch,sortById,sortByProductWeight,sortByProductPrice,sortByProductCalories,filterBySearch,sortByProductName}}>
            {children}
        </SnackContext.Provider>
    )
}