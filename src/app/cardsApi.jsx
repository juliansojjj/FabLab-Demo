import {createApi, fakeBaseQuery} from '@reduxjs/toolkit/query/react' 
import db from '../firebase';
import { getDocs, collection, doc, updateDoc, deleteDoc } from 'firebase/firestore';

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
                console.log(err)
                return {error:err}
            }
        }
      }),
      getSearch: builder.query({
        async queryFn(){
            try{
                let cards = []
                const input = sessionStorage.getItem('input')
                const ref = await getDocs(collection(db,'card'))
                const fetch = await ref.docs.map(doc=>{
                    cards.push({
                        id:doc.id,
                        ...doc.data(),
                    })
                })
                const filter = await cards.filter(item=>item.title.toLowerCase() == input)
                if(filter.length == 0){return{data:'empty'}}
                return {data:filter}

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
                return {error:err}
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
                return {error:err}
            }
        }
      }),
      toArchiveCard:builder.mutation({
        async queryFn(id){
            try{
                const docRef = doc(db,'card',id)
                const data = {archive:'true'}
                updateDoc(docRef,data).then(console.log('Archive true'))
                .catch((err)=>{console.log(err.message)})
            }catch(err){
                return {error:err}
            }
        }
      }),
      unArchiveCard:builder.mutation({
        async queryFn(id){
            try{
                const docRef = doc(db,'card',id)
                const data = {archive:'false'}
                updateDoc(docRef,data).then(console.log('Archive False'))
                .catch((err)=>{console.log(err.message)})
            }catch(err){
                return {error:err}
            }
        }
      }),
      deleteCard:builder.mutation({
        async queryFn(id){
            try{
                const docRef = doc(db,'card',id)
                await deleteDoc(docRef).then(console.log('Card eliminate'))
                .catch((err)=>{console.log(err.message)})
            }catch(err){
                return {error:err}
            }
        }
      }),
      setOld:builder.mutation({
        async queryFn(id){
            try{
                const docRef = doc(db,'card',id)
                const data = {new:'false'}
                await updateDoc(docRef,data).then(console.log('Card Old'))
                .catch((err)=>{console.log(err.message)})
            }catch(err){
                console.log(err)
            }
        }
      })
    }),
  });

export const {useGetDocsQuery, useGetSearchQuery, useGetCardMutation, useUpdateToCompleteMutation, useUpdateToIncompleteMutation, useToArchiveCardMutation, useUnArchiveCardMutation, useDeleteCardMutation, useSetOldMutation} = cardsApi;