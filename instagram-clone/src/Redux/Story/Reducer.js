import { CREATE_STORY, GET_ALL_STORY } from "./ActionType"

const initiaValue={
    createStory:null,
    getAllStory:[]
}
export const StoryReducer=(store=initiaValue, {type,payload})=>{
    if(type===CREATE_STORY){
        return {...store, createStory:payload}
    } 
    else if (type===GET_ALL_STORY){
        return {...store, getAllStory:payload}
    }
    return store;
}