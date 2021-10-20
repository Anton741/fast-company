import React from "react";
import { useParams } from "react-router-dom";
import UserPage from "../pages/userPage/userPage";
import UsersList from "../pages/usersListPage/usersListPage";

const UsersMain = () => {
    const params = useParams();
    const { userId } = params;
    return (<>{userId ? <UserPage userId = {userId} /> : <UsersList/>} </>);
};

export default UsersMain;
