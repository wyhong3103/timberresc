import '../styles/Dashboard.css';
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AccountContext } from "../context/AcountContext";
import { Nav } from "../components/Nav";

// Forest Page
// Display average data for each forest
// Display all Tree (Forest) in the watchlist 
// Display the specific forest when clicked

export const Dashboard = () => {
    
    const loggedIn = useContext(AccountContext).loggedIn;

    return(
        loggedIn ?

        <div className="forest-page">
            <Nav/>

        </div>

        :

        <Navigate to="/login"/>
    )
};