import { setupListeners } from "@reduxjs/toolkit/query";
import { cardsApi } from "./cardsApi";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";

export const store = configureStore({
    reducer:{
        [cardsApi.reducerPath] : cardsApi.reducer,
        user: userReducer
    },
    middleware:(getDefaultMiddleware)=>
    getDefaultMiddleware().concat(cardsApi.middleware),
});

setupListeners(store.dispatch);