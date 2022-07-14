import {createApi, fakeBaseQuery} from '@reduxjs/toolkit/query/react' 
import db from '../firebase';
import { getDocs, collection, doc, updateDoc } from 'firebase/firestore';

export const cardsApi = createApi({
    reducerPath: "cards",
    baseQuery: fakeBaseQuery(),
    endpoints: (builder) => ({
      getDocs: builder.query({
        async queryFn(){
            try{
                let cards = []
                const ref = await getDocs(collection(db,'card'))
                const fetch = await ref.docs.map(doc=>{
                    cards.push({
                        id:doc.id,
                        ...doc.data(),
                    })
                })
                return {data:cards}

            }catch(err){
                return {error:err}
            }
        }
      }),
      getCard:builder.mutation({
        async queryFn(string){
            try{
                let cards = []
                const ref = await getDocs(collection(db,'card'))
                const fetch = await ref.docs.map(doc=>{
                    if(doc.id === string){
                        cards.push({
                        id:doc.id,
                        ...doc.data(),
                    })}
                })
                return {data:cards}
            }catch(err){
                return {error:err}
            }
        }
      }),
      updateToComplete:builder.mutation({
        async queryFn(string){
            try{
                const docRef = doc(db,'card',string)
                const data = {state:'complete'}
                updateDoc(docRef,data).then(console.log('Complete Now'))
                .catch((err)=>{console.log(err.message)})
            }catch(err){
                return {err:err}
            }
        }
      }),
      updateToIncomplete:builder.mutation({
        async queryFn(string){
            try{
                const docRef = doc(db,'card',string)
                const data = {state:'incomplete'}
                updateDoc(docRef,data).then(console.log('Incomplete Now'))
                .catch((err)=>{console.log(err.message)})
            }catch(err){
                return {err:err}
            }
        }
      })
    }),
  });

export const {useGetDocsQuery, useGetCardMutation, useUpdateToCompleteMutation, useUpdateToIncompleteMutation} = cardsApi;