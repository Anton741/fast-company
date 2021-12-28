import httpService from "./http.service";

const usersEndpoint = "users/";

const usersHttpService = {
    get: async(id) => {
        const { data } = await httpService.get(usersEndpoint + id + ".json");
        return data;
    },
    update: async(id, content) => {
        const { data } = await httpService.put(usersEndpoint + id + ".json", content);
        return data;
    },
    delete: async(id) => {
        const { data } = await httpService.get(usersEndpoint + id);
        return data;
    },
    fetchAll: async() => {
        const { data } = await httpService.get(usersEndpoint);
        return data;
    },
    create: async(user) => {
        console.log(user);
        const { data } = await httpService.put(usersEndpoint + user._id + ".json", user);
        return data;
    }
};
export default usersHttpService;
