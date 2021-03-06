/* eslint-disable quotes */
import httpService from "./http.service";

const commentsEndpoint = "comments/";

const commentsHttpService = {
    createComment: async(payload) => {
        console.log(payload._id);
        const { data } = await httpService.put(commentsEndpoint + payload._id + '.json', payload);
        return data;
    },
    getComments: async(pageId) => {
        const { data } = await httpService.get(commentsEndpoint, {
            params: {
                orderBy: '"pageId"',
                equalTo: `"${pageId}"`
            }
        });
        return data;
    },
    removeComments: async(commentId) => {
        const { data } = await httpService.delete(commentsEndpoint + commentId + ".json");
        return data;
    }
};
export default commentsHttpService;
