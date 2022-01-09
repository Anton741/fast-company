import React from "react";
import { useParams } from "react-router-dom";
import UserPage from "../components/pages/userPage/userPage";
import UsersList from "../components/pages/usersListPage/usersListPage";
import EditForm from "../components/common/form/editForm";
import UserLoader from "../utils/hoc/userLoader";

const UsersMain = () => {
    const params = useParams();
    const { userId } = params;
    const { edit } = params;
    return (
        <div className="container">
            <div className="row gutters-sm">
                <UserLoader>
                    { edit
                        ? (<EditForm />)
                        : userId
                            ? (
                                <UserPage userId={userId} />
                            )
                            : (
                                <UsersList />
                            )}
                </UserLoader>
            </div>
        </div>
    );
};

export default UsersMain;
