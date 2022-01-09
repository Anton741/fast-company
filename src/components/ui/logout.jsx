import { useDispatch } from "react-redux";
import { logOut } from "../../store/usersReducer";

const LogOut = () => {
    const dispatch = useDispatch();
    dispatch(logOut());
    return (<h1>loading...</h1>);
};

export default LogOut;
