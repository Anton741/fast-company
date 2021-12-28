import React, { useContext, useState, useEffect } from "react";
import usersHttpService from "../../services/users.service";
import axios from "axios";
import { setTokens, getTokenKey, getUserKey, revomeTokens } from "../../services/localStorige.service";

const AuthContex = React.createContext();

export const useAuth = () => {
    return useContext(AuthContex);
};

export const AuthProvider = ({ children }) => {
    // const [error, setError] = useState();
    const [currentUser, setUser] = useState();
    useEffect(async() => {
        const accsesToken = getTokenKey();
        if (accsesToken) {
            setUser(await usersHttpService.get(getUserKey()));
        }
    }, []);
    async function singUp({ email, password, ...rest }) {
        const key = "AIzaSyAqMVF5l4F3ZpBEFbGPBa0Eu4f0b4XyI6Q";
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${key}`;
        try {
            const { data } = await axios.post(url, { email, password, returnSecureToken: true });
            setTokens(data);
            createUser({ _id: data.localId, email, ...rest });
            setUser({ _id: data.localId, email, ...rest });
        } catch (error) {
            const { code, message } = error.response.data.error;
            if (code === 400) {
                if (message === "EMAIL_EXISTS") {
                    const errorObject = {
                        email: "Пользователь с таким email существует"
                    };
                    throw errorObject;
                }
            }
        }
    }
    // useEffect(() => console.log("ERROR>>>", error), [error]);
    function createUser(user) {
        usersHttpService.create(user);
    }
    async function singIn({ email, password }) {
        const key = "AIzaSyAqMVF5l4F3ZpBEFbGPBa0Eu4f0b4XyI6Q";
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${key}`;
        try {
            const { data } = await axios.post(url, { email, password, returnSecureToken: true });
            setTokens(data);
            setUser(await usersHttpService.get(data.localId));
        } catch (error) {
            const { code, message } = error.response.data.error;
            if (code === 400) {
                if (message === "INVALID_PASSWORD") {
                    const errorObject = { password: "Неправидьный логин или пароль" };
                    throw errorObject;
                }
            }
        }
    }
    function logout() {
        setUser(null);
        revomeTokens();
    }
    return (
        <AuthContex.Provider value={{ singUp, singIn, currentUser, logout }}>
            {children}
        </AuthContex.Provider>
    );
};
