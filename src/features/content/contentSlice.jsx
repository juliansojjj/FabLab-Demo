import { createSlice } from "@reduxjs/toolkit";
import localData from '../../database/data.json';
import _ from 'lodash';


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
        userLogin(state,action){
            state.userLogin = true
            if(action.payload.createUser) {
                state.admin = action.payload.userLogin;
                state.users.push(action.payload.userLogin);
            } else{
                state.admin = action.payload;
                state.users.push(action.payload);
            }
        },
        userLogout(state,action){
            state.userLogin=false;
            state.admin = {};
        },
        usersRole(state,action){
            const userIndex = state.users.findIndex(item=>item.id == action.payload.id)
             if(action.payload.type == 'student'){
                state.users[userIndex].student = action.payload.operation;
             } else{
                state.users[userIndex].admin = action.payload.operation;
             } 
        }
    }
})

export const {newUser, userLogin, userLogout, usersRole} = contentSlice.actions;

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