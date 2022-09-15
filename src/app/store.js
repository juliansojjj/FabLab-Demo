import { setupListeners } from "@reduxjs/toolkit/query";
import { cardsApi } from "./cardsApi";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import filtersReducer from "../features/filters/filtersSlice";

export const store = configureStore({
    reducer:{
        [cardsApi.reducerPath] : cardsApi.reducer,
        filters: filtersReducer
    },
    middleware:(getDefaultMiddleware)=>
    getDefaultMiddleware().concat(cardsApi.middleware),
});

setupListeners(store.dispatch);