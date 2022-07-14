import { setupListeners } from "@reduxjs/toolkit/query";
import { cardsApi } from "./cardsApi";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer:{
        [cardsApi.reducerPath] : cardsApi.reducer,
    },
    middleware:(getDefaultMiddleware)=>
    getDefaultMiddleware().concat(cardsApi.middleware),
});

setupListeners(store.dispatch);