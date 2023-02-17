import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { Home } from './pages/Home';
import { Forest } from './pages/Forest';
import { Login } from './pages/Login';


export const App = () => {
    return(
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
                    path="/login"
                    element={<Login/>}
                />
            </Routes>
        </BrowserRouter>
    )
};