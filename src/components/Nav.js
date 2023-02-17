import { AccountContext } from "../context/AcountContext";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

export const Nav = () => {
    const context = useContext(AccountContext);
    const navigate = useNavigate();

    const toHome = () => {
        navigate("/");
    };
    const toForest = () => {
        navigate("/forest");
    };
    const toTeam = () => {
        navigate("/team");
    };
    const toLogIn = () => {
        navigate("/login");
    };

    return(
        <nav>
            <ul className="nav-links">
                <li onClick={toHome}>
                    Home
                </li>
                <li onClick={toForest}>
                    Forest
                </li>
                <li onClick={toTeam}>
                    Meet The Team
                </li>
            </ul>
            {
                context.loggedIn 
                ?
                <button className="nav-login-btn" onClick={toLogIn}>
                    Log In
                </button>
                :
                <div className="nav-user">
                    <div className="nav-user-profile">
                        <img src={context.pfp} alt="user-pfp"/>
                        <p>{context.username}</p>
                    </div>
                    <button className="nav-logout-btn">
                        Log Out
                    </button>
                </div>
            }
        </nav>
    )
};