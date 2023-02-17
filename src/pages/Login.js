import '../styles/Login.css';
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AccountContext } from "../context/AcountContext";
import { Nav } from "../components/Nav";
// Login Page

export const Login = ({setLoggedIn, setUsername, setPfp}) => {
    const loggedIn = useContext(AccountContext).loggedIn;

    const logIn = () => {
        // Dummy Data, will be changed to firebase later
        setLoggedIn(true);
        setUsername("test")
        setPfp("https://assets.popbuzz.com/2021/05/what-does-pfp-mean-on-tiktok-1612367739-view-0.png");
    }

    return(
        loggedIn ?

        <Navigate to="/"/>

        :

        <div className="login-page">
            <Nav/>
            <div className="login-main-container">
                <h2>
                    Log In To TimberResc to Start Exploring
                </h2>
                <h3>
                    Log In Options : 
                </h3>
                <button className="login-google-btn" onClick={logIn}>
                    <div className="login-google-container">
                        <img src={require('../assets/google.png')} alt="google-logo"/>
                        <p>Log In With Google</p>
                    </div>
                </button> 
            </div>
        </div>
    )
}