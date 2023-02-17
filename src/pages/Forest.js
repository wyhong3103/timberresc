import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AccountContext } from "../context/AcountContext";

// Forest Page
// Display average data for each forest
// Display all Tree (Forest) in the watchlist 
// Display the specific forest when clicked

export const Forest = () => {
    
    const loggedIn = useContext(AccountContext).loggedIn;

    return(
        loggedIn ?

        <div className="forest-page">

        </div>

        :

        <Navigate to="/login"/>
    )
};