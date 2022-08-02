import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user:'',
    email:'',
    admin:'false' //true, false
}

const userSlice = createSlice({
    name:'user',
    initialState,
    redurcers:{
        setLogin(state,action){
            state.user = action.payload.user
            state.email = action.payload.user
            console.log(state.email + state.user)
        }
    }
})

export default userSlice.reducer

export const {setLogin} = userSlice.actions