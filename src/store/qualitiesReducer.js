import { createSlice } from "@reduxjs/toolkit";
import qualitiesHttpService from "../services/qualities.service";

const qualitiesSlice = createSlice({
    name: "qualities",
    initialState: { entities: null, isLoading: true, error: null, lastFetch: null },
    reducers: {
        qualitiesRequested(state, action) {
            state.isLoading = true;
        },
        qualitiesRecieved(state, action) {
            state.entities = action.payload;
            state.isLoading = false;
            state.lastFetch = Date.now();
        },
        qualitiesRequestFaild(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        }
    }
});

const { reducer: qualitiesReducer, actions } = qualitiesSlice;
const { qualitiesRecieved, qualitiesRequested, qualitiesRequestFaild } = actions;

export const loadQualities = () => async(dispatch, getState) => {
    if (Date.now() - getState().qualities.lastFetch > 10 * 60 * 1000) {
        dispatch(qualitiesRequested());
        try {
            const { content } = await qualitiesHttpService.fetchAll();
            dispatch(qualitiesRecieved(content));
        } catch (error) {
            dispatch(qualitiesRequestFaild(error.message));
        }
    }
};

export const getQualities = () => (state) => state.qualities.entities;

export const getQualitiesListByIds = (IdsList) => (state) => {
    const qualitiesList = [];
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

export const getQualitiesLoading = () => (state) => state.qualities.isLoading;
export default qualitiesReducer;
