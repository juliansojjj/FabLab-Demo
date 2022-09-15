import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    show:'',
    order:'recent'
}

const filtersSlice = createSlice({
    name:'filters',
    initialState,
    reducers:{
        setShow(state,action){
            state.show = action.payload
            console.log(state.show)
        },
        setOrder(state,action){
            state.order = action.payload
            console.log(state.order)
        }
    }
})

export const showFilter = (state)=>state.filters.show;
export const orderFilter = (state)=>state.filters.order;

export const {setShow, setOrder} = filtersSlice.actions;

export default filtersSlice.reducer;