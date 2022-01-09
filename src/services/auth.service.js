import axios from "axios";

const httpAuth = axios.create({
    baseURL: "https://identitytoolkit.googleapis.com/v1/",
    params: {
        key: "AIzaSyAqMVF5l4F3ZpBEFbGPBa0Eu4f0b4XyI6Q"
    }
});

const authService = {
    register: async({ email, password }) => {
        const { data } = await httpAuth.post("accounts:signUp", { email, password, returnSecureToken: true });
        return data;
    },
    logIn: async({ email, password }) => {
        const { data } = await httpAuth.post("accounts:signInWithPassword", { email, password, returnSecureToken: true });
        return data;
    }
};
export default authService;
