import { configureStore } from "@reduxjs/toolkit";
import cardsReducer from '../features/cards/cardsSlice.jsx'

export default configureStore({
    reducer:{
        cards:cardsReducer
    }
})