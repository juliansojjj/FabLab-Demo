import {createApi, fakeBaseQuery} from '@reduxjs/toolkit/query/react' 
import { db } from '../firebase';
import { getDocs, getDoc, collection, doc, updateDoc, deleteDoc, data } from 'firebase/firestore';

export const cardsApi = createApi({
    reducerPath: "cards",
    baseQuery: fakeBaseQuery(),
    endpoints: (builder) => ({
        getUsers: builder.query({
            async queryFn(){
                try{
                    let users = []
                    const ref = await getDocs(collection(db,'Users'))
                    const fetch = await ref.docs.map(doc=>{
                        users.push({
                            id:doc.id,
                            ...doc.data(),
                        })
                    })
                    return {data:users}
    
                }catch(err){
                    console.log(err)
                    return {error:err}
                }
            }
          }),
          getUser: builder.mutation({
            async queryFn(id){
                try{
                    if (id){
                    const ref = await doc(db,'Users',id)
                    const fetch = await getDoc(ref)
                    const user = await fetch.data()
                    return {data:user}}
    
                }catch(err){
                    console.log(err)
                    return {error:err}
                }
            }
          }),  
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
      })
    }),
  });

export const {useGetUsersQuery, useGetUserMutation, useGetDocsQuery, useGetSearchQuery, useGetCardMutation} = cardsApi;