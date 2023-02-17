import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AccountContext } from "../context/AcountContext";
// Login Page

export const Login = ({setLoggedIn, setUsername, setPfp}) => {
    const loggedIn = useContext(AccountContext).loggedIn;

    return(
        loggedIn ?

        <Navigate to="/"/>

        :

        <div>

        </div>

    )
}