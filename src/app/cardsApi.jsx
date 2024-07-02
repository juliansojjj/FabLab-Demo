import {createApi, fakeBaseQuery} from '@reduxjs/toolkit/query/react' 
import { db } from '../firebase';
import { getDocs, getDoc, collection, doc } from 'firebase/firestore';
import localData from '../database/data.json'

export const cardsApi = createApi({
    reducerPath: "cards",
    baseQuery: fakeBaseQuery(),
    endpoints: (builder) => ({
          getUsers: builder.query({
            async queryFn(){
                try{
                    const users = localData.users.map(user=>({
                        id: user.id,
                        ...user
                    }))
                    console.log('GETUSERS')
                    console.log(users)
                    return {data:users}
    
                }catch(err){
                    console.log(err)
                    return {error:err}
                }
            }
          }),
          // modificar dsps
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
                const docs = localData.cards.map(item=>({
                    id: item.id,
                    ...item
                }))
                return {data:docs}

            }catch(err){
                console.log(err)
                return {error:err}
            }
        }
      }),
      getSearch: builder.query({
        // async queryFn(){
        //     try{
        //         const input = sessionStorage.getItem('input')
        //         const card = localData.cards.find(item=>item.title.toLocaleLowerCase == input)
                
        //         if(!card)return{data:'empty'}
        //         return {data:card}

        //     }catch(err){
        //         return {error:err}
        //     }
        // }
      }),
      getCard:builder.mutation({
        async queryFn(string){
            try{
                const card = localData.cards.find(card=> card.id === string)
                return {data:card}

            }catch(err){
                return {error:err}
            }
        }
      })
    }),
  });

export const {useGetUsersQuery, useGetUserMutation, useGetDocsQuery, useGetSearchQuery, useGetCardMutation} = cardsApi;