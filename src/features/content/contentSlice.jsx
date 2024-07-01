import { createSlice } from "@reduxjs/toolkit";
import localData from '../../database/data.json'

const initialState = {
    "admin":{
    },
    // sirve como auth
    "userLogin":false,

    "users":localData.users,
    "cards":localData.cards
}

const contentSlice = createSlice({
    name:'content',
    initialState,
    reducers:{
        newUser(state,action){
            state.newUser = {
                "name":action.payload.name,
                "email":action.payload.email,
                "pass":action.payload.pass,
                "type":"manager"
            }
        },
        userLogin(state,action){
            state.userLogin = true
            if(action.payload) state.admin = action.payload 
        },
        userLogout(state,action){
            state.userLogin=false;
            state.admin = {};
        },
        userRole(state,action){
             
        }
    }
})

export const {newUser, userLogin, userLogout} = contentSlice.actions;

export const  selectUserLogin = (state)=> state.content.userLogin;
export const  selectAdmin = (state)=> state.content.admin;

export const  selectUsers = (state)=> state.content.users;
export const  selectCards = (state)=> state.content.cards;

export default contentSlice.reducer;

/*
ACTIONS
1- iniciar sesion (crea admin e inicia sesion)
2- fetch data y usuarios

3-modificar datos de cards y users

*/