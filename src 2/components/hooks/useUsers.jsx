import React, { useContext, useState, useEffect } from "react";
import usersHttpService from "../../services/users.service";

const UsersContex = React.createContext();

export const useUsers = () => {
    return useContext(UsersContex);
};

export const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    // const [error, setError] = useState();
    const [isLoad, setIsLoad] = useState(true);
    async function getUsers() {
        const data = await usersHttpService.fetchAll();
        setUsers(data.content);
        setIsLoad(false);
    }
    useEffect(() => {
        getUsers();
    }, []);
    return (
        <UsersContex.Provider value = { { users, setUsers } } >
            {!isLoad ? children : <h1>Loading...</h1> }
        </UsersContex.Provider>
    );
};
