import { configureStore, combineReducers } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import qualitiesReducer from "./qualitiesReducer";
import professionsReducer from "./professionsReducer";
import usersReducer from "./usersReducer";
import commentsReducer from "./commentsReducer";

const rootReducer = combineReducers({
    qualities: qualitiesReducer,
    professions: professionsReducer,
    users: usersReducer,
    comments: commentsReducer
});
export const store = configureStore({
    reducer: rootReducer,
    middleware: [thunk]
});
