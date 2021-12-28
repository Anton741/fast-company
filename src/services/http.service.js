/* eslint-disable camelcase */
import axios from "axios";
import configUrl from "../config.json";
import { getExpireKey, getRefreshToken, setTokens, getTokenKey } from "./localStorige.service";

// console.log(url.apiEndpoint);
const http = axios.create({
    baseURL: configUrl.apiEndpoint
});
http.interceptors.request.use(
    async function(config) {
        if (configUrl.isFirebase) {
            // Update refresh token
            const expireData = getExpireKey();
            const refreshToken = getRefreshToken();
            if (refreshToken && expireData < Date.now()) {
                const key = "AIzaSyAqMVF5l4F3ZpBEFbGPBa0Eu4f0b4XyI6Q";
                const { data } = await axios.post(`https://identitytoolkit.googleapis.com/v1/token?key=${key}`, {
                    grant_type: "refresh_token",
                    refresh_token: refreshToken
                });
                setTokens({
                    idToken: data.id_token,
                    refreshToken: data.refresh_token,
                    expiresIn: data.expires_in,
                    localId: data.user_id
                });
            }
            config.url = config.url.replace(/\/$/g, ".json");
        }
        const accsesToken = getTokenKey();
        if (accsesToken) {
            config.params = { ...config.params, auth: accsesToken };
        }

        return config;
    }
);
http.interceptors.response.use(
    (res) => {
        if (configUrl.isFirebase) {
            console.log(res);
            if (res.data !== null && !res.data._id) {
                res.data = { content: Object.keys(res.data).map(item => res.data[item]) };
            }
        }
        return res;
    },
    function(error) {
        const expectedErrors =
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500;

        if (!expectedErrors) {
            console.log("Unexpected error");
        }
        return Promise.reject(error);
    }
);
const httpService = {
    get: http.get,
    post: http.post,
    put: http.put,
    delete: http.delete
};
export default httpService;
