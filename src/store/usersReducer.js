import { createSlice } from "@reduxjs/toolkit";
import authService from "../services/auth.service";
import { getTokenKey, getUserKey, revomeTokens, setTokens } from "../services/localStorige.service";
import usersHttpService from "../services/users.service";
import errorAuthGenerate from "../utils/errorAuthGenerate";
import history from "../utils/history";

const initialState = getTokenKey()
    ? {
        entities: null,
        isLoading: true,
        error: null,
        auth: { userId: getUserKey() },
        isLogging: true,
        dataLoaded: false
    }
    : {
        entities: null,
        isLoading: false,
        error: null,
        auth: null,
        isLogging: false,
        dataLoaded: false
    };

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        usersRequested(state, action) {
            state.isLoading = true;
        },
        usersRecieved(state, action) {
            state.entities = action.payload;
            state.isLoading = false;
            state.dataLoaded = true;
        },
        usersRequestFaild(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        },
        userRemove(state, action) {
            state.entities = state.entities.filter(user => user._id !== action.payload);
        },
        userAuthSuccess(state, action) {
            state.auth = { ...action.payload };
            state.isLogging = true;
            state.error = null;
        },
        userAuthFail(state, action) {
            state.error = action.payload;
        },
        userCreate(state, action) {
            state.entities.push(action.payload);
        },
        userLogOut(state, action) {
            state.auth = null;
            state.isLogging = false;
            state.dataLoaded = false;
        },
        userUpdate(state, action) {
            const newUsers = state.entities.filter(user => user._id !== action.payload._id);
            state.entities = [...newUsers, action.payload];
        }
    }
});

const { reducer: usersReducer, actions } = usersSlice;
const { usersRecieved, usersRequested, usersRequestFaild, userRemove, userAuthSuccess, userAuthFail, userCreate, userLogOut, userUpdate } = actions;

export const loadUsers = () => async(dispatch) => {
    dispatch(usersRequested());
    try {
        const { content } = await usersHttpService.fetchAll();
        dispatch(usersRecieved(content));
    } catch (error) {
        dispatch(usersRequestFaild(error.message));
    }
};

export const deleteUser = (id) => async(dispatch) => {
    dispatch(userRemove(id));
    await usersHttpService.delete(id);
};
export const createUser = (payload) => async(dispatch) => {
    await usersHttpService.create(payload);
    dispatch(userCreate(payload));
};
export const editUser = (payload) => async(dispatch) => {
    usersHttpService.update(payload._id, payload);
    dispatch(userUpdate(payload));
};

export const singUp = ({ email, password, ...rest }) => async(dispatch) => {
    try {
        const data = await authService.register({ email, password });
        setTokens(data);
        dispatch(userAuthSuccess({ ...data, userId: data.localId }));
        dispatch(createUser({ email, _id: data.localId, ...rest }));
        history.push("/users");
    } catch (error) {
        const err = errorAuthGenerate(error);
        dispatch(userAuthFail(err));
    }
};

export const singIn = ({ email, password }) => async(dispatch) => {
    try {
        const data = await authService.logIn({ email, password });
        setTokens(data);
        dispatch(userAuthSuccess({ userId: data.localId }));
    } catch (error) {
        const err = errorAuthGenerate(error);
        dispatch(userAuthFail(err));
    }
    history.push("/users");
};

export const logOut = () => (dispatch) => {
    revomeTokens();
    dispatch(userLogOut());
    history.push("/login");
};

export const getUsers = () => (state) => state.users.entities;
export const getUsersById = (id) => (state) => state.users.entities.find(user => user._id === id);
export const getIsLogging = () => (state) => state.users.isLogging;
export const getDataLoaded = () => (state) => state.users.dataLoaded;
export const getLoading = () => (state) => state.users.isLoading;
export const getCurrentUser = () => (state) => {
    return state.users.entities
        ? state.users.entities.find(user => user._id === state.users.auth.userId)
        : null;
};

export const getAuthError = () => (state) => state.users.error;

export default usersReducer;
