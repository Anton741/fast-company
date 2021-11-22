import httpService from "./http.service";

const usersEndpoint = "user/";

const usersHttpService = {
    get: async(id) => {
        const { data } = await httpService.get(usersEndpoint + id);
        return data;
    },
    uptade: async(id, content) => {
        const { data } = await httpService.put(usersEndpoint + id, content);
        return data;
    },
    delete: async(id) => {
        const { data } = await httpService.get(usersEndpoint + id);
        return data;
    },
    fetchAll: async() => {
        const { data } = await httpService.get(usersEndpoint);
        return data;
    }
};
export default usersHttpService;
