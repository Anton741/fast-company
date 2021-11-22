import axios from "axios";
import url from "../config.json";

// console.log(url.apiEndpoint);
axios.defaults.baseURL = url.apiEndpoint;
axios.interceptors.response.use(
    (res) => res,
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
