import { setupListeners } from "@reduxjs/toolkit/query";
import { configureStore} from "@reduxjs/toolkit";
import contentReducer from "../features/content/contentSlice";

export const store = configureStore({
    reducer:{
        content:contentReducer
    }
});

setupListeners(store.dispatch);