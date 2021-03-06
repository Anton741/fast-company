import React from "react";
import { useParams } from "react-router-dom";
import UserPage from "../pages/userPage/userPage";
import UsersList from "../pages/usersListPage/usersListPage";
import EditForm from "../common/form/editForm";

const UsersMain = () => {
    const params = useParams();
    const { userId } = params;
    const { edit } = params;
    return (
        <div className="container">
            <div className="row gutters-sm">
                {edit ? <EditForm /> : (userId ? <UserPage userId = {userId} /> : <UsersList/>)}
            </div>
        </div>);
};

export default UsersMain;
