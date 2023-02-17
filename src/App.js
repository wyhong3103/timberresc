import './styles/App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { AccountContext } from './context/AcountContext';
import { Home } from './pages/Home';
import { Forest } from './pages/Forest';
import { Team } from './pages/Team';
import { Login } from './pages/Login';
import { useState } from 'react';


export const App = () => {

    const [loggedIn, setLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const [pfp, setPfp] = useState("");

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
                        path="/forest"
                        element={<Forest/>}
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
                </Routes>
            </BrowserRouter>
        </AccountContext.Provider>
    )
};