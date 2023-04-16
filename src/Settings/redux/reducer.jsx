import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts: []
}
export const Reducer = createSlice({
    name: "posts",
    initialState,
    reducers:{
        setPosts(state, action){
            state.posts = action.payload
        },
        deletePosts(state, action){
            state.posts = state.posts.filter((item) => item.id !== action.id)
        }
    }  
})
export const SetReducer = Reducer.reducer
export const SetAction = Reducer.actions