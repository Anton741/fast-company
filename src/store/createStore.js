import { configureStore, combineReducers } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import qualitiesReducer from "./qualitiesReducer";
import professionsReducer from "./professionsReducer";

const rootReducer = combineReducers({
    qualities: qualitiesReducer,
    professions: professionsReducer
});
console.log(rootReducer);
export const store = configureStore({
    reducer: rootReducer,
    middleware: [thunk]
});
