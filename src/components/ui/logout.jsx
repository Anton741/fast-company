import { useAuth } from "../hooks/useAuth";
import { useHistory } from "react-router-dom";

const LogOut = () => {
    const { logout } = useAuth();
    const history = useHistory();
    logout();
    history.push("/login/");
    return (<h1>loading...</h1>);
};

export default LogOut;
