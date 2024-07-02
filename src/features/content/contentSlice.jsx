import { createSlice } from "@reduxjs/toolkit";
import localData from '../../database/data.json';
import _ from 'lodash';


const initialState = {
    "admin":{
    },
    // sirve como auth
    "userLogin":false,

    "users":localData.users,
    "cards":localData.cards,

    "search":''
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
        },
        deleteUser(state,action){
            console.log(action.payload)
            const userIndex = state.users.findIndex(item=>item.id == action.payload);
            console.log(userIndex)
            state.userLogin=false;
            state.admin = {};
            if(userIndex !== -1) state.users.splice(userIndex,1);
        },
        searchUpdate(state,action){
            const input = action.payload.trim()
            const card = state.cards.find(item=>item.title.toLocaleLowerCase == input)
                
            if(!card){
            }else state.search = card

        },
        obsoleteViewed(state,action){
            const userIndex = state.users.findIndex(item=>item.id == action.payload.userId);
            const cardId = action.payload.cardId;
            console.log(action.payload)
            if(state.users[userIndex].viewed.find(item=>item == cardId)){                
            }else {
                state.users[userIndex].viewed.push(cardId)
                state.admin.viewed.push(cardId)
            }
        }
    }
})

export const {newUser, userLogin, userLogout, usersRole, deleteUser, searchUpdate, obsoleteViewed} = contentSlice.actions;

export const  selectUserLogin = (state)=> state.content.userLogin;
export const  selectAdmin = (state)=> state.content.admin;

export const  selectUsers = (state)=> state.content.users;
export const  selectCards = (state)=> state.content.cards;

export const  selectSearch = (state)=> state.content.search;

export default contentSlice.reducer;

/*
ACTIONS
1- iniciar sesion (crea admin e inicia sesion)
2- fetch data y usuarios

3-modificar datos de cards y users

*/