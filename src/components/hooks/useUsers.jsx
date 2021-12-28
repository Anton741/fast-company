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
        if (data) {
            setUsers(data.content);
        } else {
            setUsers({});
        }
        setIsLoad(false);
    }
    function getUsersById(userId) {
        return users.find(u => u._id === userId);
    }
    function editUser(payload) {
        const newUsers = users.filter(user => user._id !== payload._id);
        usersHttpService.update(payload._id, payload);
        setUsers(() => [...newUsers, payload]);
    }
    useEffect(() => {
        getUsers();
    }, []);
    return (
        <UsersContex.Provider value = { { users, setUsers, getUsersById, editUser } } >
            {!isLoad ? children : <h1>Loading...gtu</h1> }
        </UsersContex.Provider>
    );
};
