import httpService from "./http.service";

const professionsEndpoint = "professions/";

const professionsHttpService = {
    get: async(id) => {
        const { data } = await httpService.get(professionsEndpoint + id);
        return data;
    },
    uptade: async(id, content) => {
        const { data } = await httpService.put(professionsEndpoint + id, content);
        return data;
    },
    delete: async(id) => {
        const { data } = await httpService.get(professionsEndpoint + id);
        return data;
    },
    fetchAll: async() => {
        const { data } = await httpService.get(professionsEndpoint);
        return data;
    }
};
export default professionsHttpService;
