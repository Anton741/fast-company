import React, { useContext } from "react";
import axious from "axios";
// import AuthHttpService from "../../services/Auth.service";

const AuthContex = React.createContext();

export const useAuth = () => {
    return useContext(AuthContex);
};

export const AuthProvider = ({ children }) => {
    async function singUp({ email, password }) {
        const key = "AIzaSyAqMVF5l4F3ZpBEFbGPBa0Eu4f0b4XyI6Q";
        const url = `https://securetoken.googleapis.com/v1/token?key=${key}`;
        const { data } = await axious.post(url, { email, password, returnSecureToken: true });
        console.log(data);
    };
    return (
        <AuthContex.Provider value ={{ singUp }}>
            {children}
        </AuthContex.Provider>
    );
};
