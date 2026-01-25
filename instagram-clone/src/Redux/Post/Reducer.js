import { CREATE_NEW_POST, DELETE_POST, GET_BY_USER_ID, GET_BY_USER_IDS, GET_SINGLE_POST, LIKE_POST, SAVE_POST } from "./ActionType"

const initiaValue ={
    createPost:null,
    usersPost:[],
    likePost: null,
    savePost:"",
    singlePost:null,
    userPost:[]
}
export const PostReducer=(store=initiaValue, {type, payload})=>{
    if(type===CREATE_NEW_POST){
        return {...store, createPost:payload}
    } 
    else if(type===GET_BY_USER_IDS){
        return {...store, usersPost:payload}
    }
     else if(type===DELETE_POST){
        return {...store, usersPost: store.usersPost.filter((post) => post.id !== payload),
            userPost: Array.isArray(store.userPost) 
                ? store.userPost.filter((post) => post.id !== payload) 
                : store.userPost
        }
    }
     else if(type===LIKE_POST){
        return {...store, likePost:payload}
    }
     else if(type===SAVE_POST){
        return {...store, savePost:payload}
    }
     else if(type===GET_SINGLE_POST){
        return {...store, singlePost:payload}
    }
     else if(type===GET_BY_USER_ID){
        return {...store, userPost:payload}
    }
return store;
}