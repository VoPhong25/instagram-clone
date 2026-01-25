import {thunk} from "redux-thunk"
import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { UserReducer } from "../User/Reducer";
import {AuthReducer} from "../Auth/Reducer"
import { PostReducer } from "../Post/Reducer";
import { CommentReducer } from "../Comment/Reducer";
import { StoryReducer } from "../Story/Reducer";
import { MessageReducer } from "../Message/Reducer";
import { AdminReducer } from "../Admin/Reducer";


const rootReducers=combineReducers({
    auth:AuthReducer,
    user:UserReducer,
    post:PostReducer,
    comment:CommentReducer,
    story:StoryReducer,
    message:MessageReducer,
    admin:AdminReducer,
})
export const store = legacy_createStore(rootReducers, applyMiddleware(thunk));