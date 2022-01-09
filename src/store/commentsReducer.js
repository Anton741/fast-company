import { createSlice } from "@reduxjs/toolkit";
import commentsHttpService from "../services/comments.service";

const initialState = {
    entities: null,
    isLoading: false,
    error: null
};
const commentsSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {
        commentsRequested(state) {
            state.isLoading = true;
        },
        commentsRecieved(state, action) {
            state.entities = action.payload;
            state.isLoading = false;
        },
        commentsResponseFaild(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        },
        commentsRemove(state, action) {
            state.entities = state.entities.filter(comment => comment._id !== action.payload);
        },
        commentAdd(state, action) {
            state.entities.push(action.payload);
        }
    }
});

const { reducer, actions } = commentsSlice;
const { commentsRequested, commentsRecieved, commentsResponseFaild, commentsRemove, commentAdd } = actions;
export const loadComments = (pageId) => async(dispatch) => {
    dispatch(commentsRequested);
    try {
        const { content } = await commentsHttpService.getComments(pageId);
        dispatch(commentsRecieved(content));
    } catch (error) {
        dispatch(commentsResponseFaild(error));
    }
};
export const removeComments = (commentId) => async(dispatch) => {
    const content = await commentsHttpService.removeComments(commentId);
    if (content === null) {
        dispatch(commentsRemove(commentId));
    }
};

export const addComment = (comment) => async(dispatch) => {
    const content = await commentsHttpService.createComment(comment);
    dispatch(commentAdd(content));
};

export const getComments = () => (state) => state.comments.entities;
export default reducer;
