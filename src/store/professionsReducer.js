import { createSlice } from "@reduxjs/toolkit";
import professionsHttpService from "../services/profession.service";

const professionsSlice = createSlice({
    name: "professions",
    initialState: { entities: null, isLoading: true, error: null },
    reducers: {
        professionsRequested(state, action) {
            state.isLoading = true;
        },
        professionsRecieved(state, action) {
            state.entities = action.payload;
            state.isLoading = false;
        },
        professionsRequestFaild(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        }
    }
});

const { reducer: professionsReducer, actions } = professionsSlice;
const { professionsRecieved, professionsRequested, professionsRequestFaild } = actions;

export const loadProfessions = () => async dispatch => {
    dispatch(professionsRequested());
    try {
        const { content } = await professionsHttpService.fetchAll();
        dispatch(professionsRecieved(content));
    } catch (error) {
        dispatch(professionsRequestFaild(error.message));
    }
};
export const getProfessionByIds = (id) => (state) => {
    console.log(state.professions.entities.find(prof => prof._id === id));
    return state.professions.entities.find(prof => prof._id === id);
};

export const getProfessions = () => (state) => state.professions.entities;

export default professionsReducer;
