import React, { useContext, useEffect, useState } from "react";
import usersHttpService from "../../services/users.service";
import axios from "axios";
import { setTokens } from "../../services/localStorige.service";

const AuthContex = React.createContext();

export const useAuth = () => {
    return useContext(AuthContex);
};

export const AuthProvider = ({ children }) => {
    const [error, setError] = useState();
    const [currentUser, setUser] = useState();
    async function singUp({ email, password, ...rest }) {
        const key = "AIzaSyAqMVF5l4F3ZpBEFbGPBa0Eu4f0b4XyI6Q";
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${key}`;
        try {
            const { data } = await axios.post(url, { email, password, returnSecureToken: true });
            setTokens(data);
            createUser({ _id: data.localId, email, ...rest });
            setUser({ _id: data.localId, email, ...rest });
        } catch (error) {
            setError(error.message);
        }
    }
    useEffect(() => console.log("ERROR>>>", error), [error]);
    function createUser(user) {
        usersHttpService.create(user);
    }
    async function singIn({ email, password }) {
        const key = "AIzaSyAqMVF5l4F3ZpBEFbGPBa0Eu4f0b4XyI6Q";
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${key}`;
        try {
            const { data } = await axios.post(url, { email, password, returnSecureToken: true });
            console.log("sing in", data);
        } catch (error) {
            const { code, message } = error.response.data.error;
            if (code === 400) {
                if (message === "INVALID_PASSWORD") {
                    console.log("hghgghffghghfg");
                    const errorObject = { password: "Неправидьный логин или пароль" };
                    throw errorObject;
                }
            }
        }
    }
    console.log(currentUser);
    return (
        <AuthContex.Provider value={{ singUp, singIn }}>
            {children}
        </AuthContex.Provider>
    );
};
