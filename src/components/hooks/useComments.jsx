import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import commentsHttpService from "../../services/comments.service";

const CommentsContext = React.createContext();

export const useComments = () => {
    return useContext(CommentsContext);
};

export const CommentsProvider = ({ children }) => {
    const params = useParams();
    const { userId } = params;
    const [isLoad, setIsLoad] = useState(true);
    const [comments, setComments] = useState({});
    useEffect(() => {
        getComments(userId);
    }, [userId]);
    async function getComments(pageId) {
        const { content } = await commentsHttpService.getComments(pageId);
        setComments(content);
        setIsLoad(false);
    }
    async function addComment(payload) {
        const content = await commentsHttpService.createComment(payload);
        setComments(prevState => [...prevState, content]);
    }
    async function removeComment(commentId) {
        const content = await commentsHttpService.removeComments(commentId);
        if (content === null) {
            setComments(prevState => prevState.filter(c => c._id !== commentId));
        }
    }
    return (
        <CommentsContext.Provider value={{ comments, addComment, removeComment }}>
            {!isLoad ? children : <h1>Loading....</h1>}
        </CommentsContext.Provider>
    );
};

export default CommentsProvider;
