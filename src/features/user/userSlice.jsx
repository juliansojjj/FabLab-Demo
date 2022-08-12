import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    log:'false',
    id:'',
    email:'',
    admin:'false' //true, false
}

const userSlice = createSlice({
    name:'user',
    initialState,
    redurcers:{
        setLogin(state,action){
        },
        setLogon(state,action){
            state.log = 'true'
            console.log('dispatched')
        }
    }
})

export const selectLog = (state)=>state.user.log;

export const {setLogin, setLogon} = userSlice.actions;

export default userSlice.reducer;