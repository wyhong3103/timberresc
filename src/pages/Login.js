import '../styles/Login.css';
import { useContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { AccountContext } from "../context/AcountContext";
import { Nav } from "../components/Nav";
import { getAuth, GoogleAuthProvider, signInWithRedirect, getRedirectResult} from 'firebase/auth';
// Login Page

export const Login = ({setLoggedIn, setUsername, setPfp, setUserID}) => {
    const auth = getAuth()
    const provider = new GoogleAuthProvider();
    const loggedIn = useContext(AccountContext).loggedIn;
    const [showLoginError, setShowLoginError] = useState(false);

    const logIn = () => {
        signInWithRedirect(auth, provider);
    }

    useEffect(
        () => { 
            getRedirectResult(auth)
            .then(
                (result) => {
                    if (result && result.user){
                        setLoggedIn(true);
                        setUsername(result.user.displayName);
                        setPfp(result.user.photoURL);
                        setUserID(result.user.uid);
                    }
                }
            )
            .catch(
                (error) => {
                    console.error(error);
                    setShowLoginError(true);
                }
            )
        }
    , [])

    return(
        loggedIn ?

        <Navigate to="/"/>

        :

        <div className="login-page">
            <Nav/>
            <div className="login-main-container">
                <h2>
                    Log In To TimberResc to Start Your Journey.
                </h2>
                <button className="login-google-btn" onClick={logIn}>
                    <div className="login-google-container">
                        <img src={require('../assets/google.png')} alt="google-logo"/>
                        <p>Log In With Google</p>
                    </div>
                </button> 
                {
                    showLoginError === true ?
                    <p className='login-error-msg'>
                        Something went wrong, please try again later.
                    </p>
                    :
                    null
                }
            </div>
        </div>
    )
}