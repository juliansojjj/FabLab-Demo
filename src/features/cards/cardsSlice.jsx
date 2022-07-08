import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import db from '../../firebase'
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore'

const initialState = {
    cards:[],
    status:'pending',
    error:null
}

export const fetchCards = createAsyncThunk('cards/fetchCards',
async()=>{
    try{
        const data = await getDocs(collection(db,'card'));
        const array = data.docs.map(item=>({
            id:item.id,
            ...item.data()
            }
        ))
        return array;
    }
    catch(err){
        return err.message
    }
})

const cardsSlice = createSlice({
    name : 'cards',
    initialState,
    reducers:{
        handleComplete(state,action){
            const docRef = doc(db,'card',action.payload.id)
            const data = {state:'complete'}
            updateDoc(docRef,data).then(item=>{state.status = 'completed'})
            .catch((err)=>{console.log(err.message)})
            state.status = 'completed'
            console.log(state.status)
        },
        handleIncomplete(state,action){
            const docRef = doc(db,'card',action.payload.id)
            const data = {state:'incomplete'}
            updateDoc(docRef,data).then(item=>{state.status = 'incompleted'})
            .catch((err)=>{console.log(err.message)})   
            state.status = 'incompleted'
            console.log(state.status)
        }
    },
    extraReducers:{
        [fetchCards.pending]:(state)=>{
            state.status='pending';
        },
        [fetchCards.fulfilled]:(state,{payload})=>{
            state.status='fulfilled';
            state.cards = payload;
            console.log(state.status)
        },
        [fetchCards.rejected]:(state,{error})=>{
            state.error= error.message;
        }
    }
})

export const selectCards = (state)=>state.cards.cards;
export const statusCards= (state)=>state.cards.status;
export const errorCards= (state)=>state.cards.error;
export const mainState = (state)=>state.status;

export const {handleComplete,handleIncomplete} = cardsSlice.actions;

export default cardsSlice.reducer;