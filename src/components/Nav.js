import '../styles/Nav.css';
import { AccountContext } from "../context/AcountContext";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { getAuth, signOut } from 'firebase/auth';

export const Nav = () => {
    const auth = getAuth();
    const context = useContext(AccountContext);
    const navigate = useNavigate();

    const toHome = () => {
        navigate("/");
    };
    const toDashboard = () => {
        navigate("/dashboard");
    };
    const toTeam = () => {
        navigate("/team");
    };
    const toLogIn = () => {
        navigate("/login");
    };

    const logOut = () => {
        signOut(auth);
    }

    return(
        <nav>
            <h1 className='nav-title nav-left'>
                TimberResc
            </h1>
            <div className="nav-right">
                <ul className="nav-links">
                    <li onClick={toHome}>
                        Home
                    </li>
                    <li onClick={toDashboard}>
                        Dashboard
                    </li>
                    <li onClick={toTeam}>
                        Meet The Team
                    </li>
                </ul>
                {
                    !context.loggedIn
                    ?
                    <button className="nav-login-btn" onClick={toLogIn}>
                        Log In
                    </button>
                    :
                    <div className="nav-user">
                        <div className="nav-user-profile">
                            <img src={context.pfp} alt="user-pfp" referrerPolicy="no-referrer"/>
                        </div>
                        <button className="nav-logout-btn" onClick={logOut}>
                            Log Out
                        </button>
                    </div>
                }
            </div>
        </nav>
    )
};