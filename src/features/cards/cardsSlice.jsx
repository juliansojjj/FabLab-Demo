import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import db from '../../firebase'
import { collection, getDocs, addDoc } from 'firebase/firestore'

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
        stateHandle(state,action){
        }
    },
    extraReducers:{
        [fetchCards.pending]:(state)=>{
            state.status='pending';
        },
        [fetchCards.fulfilled]:(state,{payload})=>{
            state.status='fulfilled';
            state.cards = payload;
        },
        [fetchCards.rejected]:(state,{error})=>{
            state.error= error.message;
        }
    }
})

export const selectCards = (state)=>state.cards.cards;
export const statusCards= (state)=>state.cards.status;
export const errorCards= (state)=>state.cards.error;

export const {stateHandle} = cardsSlice.actions;

export default cardsSlice.reducer;