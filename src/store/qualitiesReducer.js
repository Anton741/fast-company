import { createSlice } from "@reduxjs/toolkit";
import qualitiesHttpService from "../services/qualities.service";

const qualitiesSlice = createSlice({
    name: "qualities",
    initialState: { entities: null, isLoading: true, error: null },
    reducers: {
        qualitiesRequested(state, action) {
            state.isLoading = true;
        },
        qualitiesRecieved(state, action) {
            state.entities = action.payload;
            state.isLoading = false;
        },
        qualitiesRequestFaild(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        }
    }
});

const { reducer: qualitiesReducer, actions } = qualitiesSlice;
const { qualitiesRecieved, qualitiesRequested, qualitiesRequestFaild } = actions;

export const loadQualities = () => async dispatch => {
    dispatch(qualitiesRequested());
    try {
        const { content } = await qualitiesHttpService.fetchAll();
        dispatch(qualitiesRecieved(content));
    } catch (error) {
        dispatch(qualitiesRequestFaild(error.message));
    }
};

export const getQualities = () => (state) => state.qualities.entities;

export const getQualitiesListByIds = (IdsList) => (state) => {
    const qualitiesList = [];
    console.log(state.qualities.entities);
    for (let i = 0; i < IdsList.length; i++) {
        for (let j = 0; j < state.qualities.entities.length; j++) {
            if (IdsList[i] === state.qualities.entities[j]._id) {
                qualitiesList.push(state.qualities.entities[j]);
                break;
            }
        }
    }
    return qualitiesList;
};
export default qualitiesReducer;
