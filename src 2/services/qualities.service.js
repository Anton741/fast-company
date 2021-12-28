import httpService from "./http.service";

const qualitiesEndpoint = "qualities/";

const professionsHttpService = {
    get: async(id) => {
        const { data } = await httpService.get(qualitiesEndpoint + id);
        return data;
    },
    uptade: async(id, content) => {
        const { data } = await httpService.put(qualitiesEndpoint + id, content);
        return data;
    },
    delete: async(id) => {
        const { data } = await httpService.get(qualitiesEndpoint + id);
        return data;
    },
    fetchAll: async() => {
        const { data } = await httpService.get(qualitiesEndpoint);
        return data;
    }
};
export default professionsHttpService;
