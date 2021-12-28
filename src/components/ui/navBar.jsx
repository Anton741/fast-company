import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import NavProfile from "./navProfile";

const NavBar = () => {
    const { currentUser } = useAuth();
    return (
        <nav className ="navbar">
            <div className="container-fluid">
                <ul className="nav">
                    <li className="nav-item">
                        <Link className ="nav-link active" aria-current="page" to ="/">Main</Link>
                    </li>
                    <li className="nav-item">
                        <Link className ="nav-link" to="/users">Users</Link>
                    </li>
                </ul>
                <div className="d-flex">
                    {!currentUser ? <Link className ="nav-link" to="/login">Login</Link> : <NavProfile/>}
                </div>
            </div>
        </nav>
    );
};
export default NavBar;
