import '../styles/Dashboard.css';
import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { AccountContext } from "../context/AcountContext";
import { Forest } from '../components/Forest';
import { Tree } from '../components/Tree';
import { Nav } from "../components/Nav";

// Forest Page
// Display average data for each forest
// Display all Tree (Forest) in the watchlist 
// Display the specific forest when clicked

export const Dashboard = () => {
    
    const loggedIn = useContext(AccountContext).loggedIn;
    // 0 = Show forest, > 1, show a specific i-th tree
    const [component, setComponent] = useState(0);

    return(
        loggedIn ?

        <div className="dashboard-page">
            <Nav/>
            <div className='dashboard-main-container'>
                {
                    component === 0 ?
                    <Forest/>
                    :
                    <Tree/>
                }
            </div>
        </div>

        :

        <Navigate to="/login"/>
    )
};