import './styles/App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { AccountContext } from './context/AcountContext';
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import { Team } from './pages/Team';
import { Login } from './pages/Login';
import { useState } from 'react';
import { getAuth, onAuthStateChanged} from 'firebase/auth';


export const App = () => {
    const auth = getAuth();
    const [loggedIn, setLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const [pfp, setPfp] = useState("");

    onAuthStateChanged(auth, 
        (user) => {
            if (user){
                setLoggedIn(true);
                setUsername(user.displayName);
                setPfp(user.photoURL);
            }else{
                setLoggedIn(false);
                setUsername("");
                setPfp("");
            }
        }
    )

    return(
        <AccountContext.Provider 
            value = 
            {
                {
                    loggedIn, username, pfp
                }
            }
        >
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={<Home/>}
                    />
                    <Route
                        path="/dashboard"
                        element={<Dashboard/>}
                    />
                    <Route
                        path="/team"
                        element={<Team/>}
                    />
                    <Route
                        path="/login"
                        element=
                        {
                            <Login 
                            setLoggedIn={setLoggedIn}
                            setUsername={setUsername}
                            setPfp={setPfp}
                            />
                        }
                    />
                    <Route
                        path="/*"
                        element={<Home/>}
                    />
                </Routes>
            </BrowserRouter>
        </AccountContext.Provider>
    )
};