import axios from "axios";
import configUrl from "../config.json";

// console.log(url.apiEndpoint);
axios.defaults.baseURL = configUrl.apiEndpoint;
axios.interceptors.request.use(
    function(config) {
        if (configUrl.isFirebase) {
            config.url = config.url.replace(/\/$/g, ".json");
        }
        return config;
    }
);
axios.interceptors.response.use(
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
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete
};
export default httpService;
