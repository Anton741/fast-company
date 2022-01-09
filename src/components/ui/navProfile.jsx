import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { getCurrentUser } from "../../store/usersReducer";

const NavProfile = () => {
    const currentUser = useSelector(getCurrentUser());
    const [isOpen, setOpen] = useState(false);
    if (!currentUser) {
        return "loading...";
    }
    return (
        <div className="dropdown">
            <div
                className="btn dropdown-toggle d-flex align-item-center"
                onClick={() => setOpen(prev => !prev)}
            >
                <div className="me-2">{currentUser.name}</div>
                <img
                    src={currentUser.photo}
                    className="rounded-circle"
                    width="150"
                    height="40"
                />
            </div>
            <div className= { "w-100 dropdown-menu " + (isOpen ? "show" : "")}>
                <Link to = {`/users/${currentUser._id}`} className = 'dropdown-item' onClick = {() => setOpen(false)}>Profile</Link>
                <Link to = "/logout/" className = 'dropdown-item' onClick = {() => setOpen(false)}>Log out</Link>
            </div>
        </div>
    );
};

export default NavProfile;
