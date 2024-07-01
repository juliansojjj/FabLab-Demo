import { setupListeners } from "@reduxjs/toolkit/query";
import { cardsApi } from "./cardsApi";
import { configureStore} from "@reduxjs/toolkit";
import filtersReducer from "../features/filters/filtersSlice";
import contentReducer from "../features/content/contentSlice";

export const store = configureStore({
    reducer:{
        [cardsApi.reducerPath] : cardsApi.reducer,
        filters: filtersReducer,
        content:contentReducer
    },
    middleware:(getDefaultMiddleware)=>
    getDefaultMiddleware().concat(cardsApi.middleware),
});

setupListeners(store.dispatch);