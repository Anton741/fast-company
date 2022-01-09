import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDataLoaded, loadUsers } from "../../store/usersReducer";

const UserLoader = ({ children }) => {
    const dispatch = useDispatch();
    const dataLoaded = useSelector(getDataLoaded());
    useEffect(() => {
        if (!dataLoaded) {
            dispatch(loadUsers());
        }
    }, []);
    if (!dataLoaded) { return <h1>Loading....</h1>; }
    return (children);
};

export default UserLoader;
