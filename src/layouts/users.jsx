import React from "react";
import { useParams } from "react-router-dom";
import UserPage from "../components/pages/userPage/userPage";
import UsersList from "../components/pages/usersListPage/usersListPage";
import EditForm from "../components/common/form/editForm";
import { UserProvider } from "../components/hooks/useUsers";

const UsersMain = () => {
    console.log("Usersdgfchgfh");
    const params = useParams();
    const { userId } = params;
    const { edit } = params;
    return (
        <div className="container">
            <div className="row gutters-sm">
                <UserProvider>
                    {edit ? <EditForm/> : (userId ? <UserPage userId = {userId} /> : <UsersList/>)}
                </UserProvider>
            </div>
        </div>);
};

export default UsersMain;
