import axios from "axios";
import configUrl from "../config.json";

// console.log(url.apiEndpoint);
const http = axios.create({
    baseURL: configUrl.apiEndpoint
});
http.interceptors.request.use(
    function(config) {
        if (configUrl.isFirebase) {
            config.url = config.url.replace(/\/$/g, ".json");
        }
        return config;
    }
);
http.interceptors.response.use(
    (res) => {
        if (configUrl.isFirebase) {
            res.data = { content: Object.keys(res.data).map(item => res.data[item]) };
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
