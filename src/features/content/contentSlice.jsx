import { createSlice } from "@reduxjs/toolkit";
import localData from '../../database/data.json';

const initialState = {
    "admin":{
    },
    // sirve como auth
    "userLogin":false,

    "users":localData.users,
    "cards":localData.cards,

    "show":"all",
    "order":"recent",

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
        userLogout(state){
            state.userLogin=false;
            state.admin = {};
        },
        usersRole(state,action){
            const userIndex = state.users.findIndex(item=>item.id === action.payload.id)
             if(action.payload.type === 'student'){
                state.users[userIndex].student = action.payload.operation;
             } else{
                state.users[userIndex].admin = action.payload.operation;
             } 
        },
        deleteUser(state,action){
            const userIndex = state.users.findIndex(item=>item.id === action.payload);
            state.userLogin=false;
            state.admin = {};
            if(userIndex !== -1) state.users.splice(userIndex,1);
        },
        searchUpdate(state,action){
            const input = action.payload.trim()
            const card = state.cards.find(item=>item.title.toLocaleLowerCase === input)
                
            if(card) state.search = card

        },
        obsoleteViewed(state,action){
            const userIndex = state.users.findIndex(item=>item.id === action.payload.userId);
            const cardId = action.payload.cardId;
            if(!state.users[userIndex].viewed.find(item=>item === cardId)){ 
                state.users[userIndex].viewed.push(cardId)
                state.admin.viewed.push(cardId)
            }
        },
        cardModification(state,action){
            const cardId = action.payload.cardId;
            const cardIndex = state.cards.findIndex(item=>item.id === cardId);
            
            if(action.payload.operation === 'state')         state.cards[cardIndex].state = action.payload.value;         
            else if(action.payload.operation === 'archive')  state.cards[cardIndex].archive = action.payload.value;
            else if(action.payload.operation === 'printer')  state.cards[cardIndex].printer = action.payload.value;
            else state.cards.splice(cardIndex,1)
        },
        filtersAndOrder(state,action){
            if(action.payload.order) state.order = action.payload.order;
            if(action.payload.show) state.show = action.payload.show;
            

        }
    }
})

export const {newUser, userLogin, userLogout, usersRole, deleteUser, searchUpdate, obsoleteViewed, cardModification, filtersAndOrder} = contentSlice.actions;

export const  selectUserLogin = (state)=> state.content.userLogin;
export const  selectAdmin = (state)=> state.content.admin;

export const  selectUsers = (state)=> state.content.users;
export const  selectCards = (state)=> state.content.cards;

export const  selectCardsOrder = (state)=> state.content.order;
export const  selectCardsShow = (state)=> state.content.show;

export const  selectSearch = (state)=> state.content.search;

export default contentSlice.reducer;

/*
ACTIONS
1- iniciar sesion (crea admin e inicia sesion)
2- fetch data y usuarios

3-modificar datos de cards y users

*/