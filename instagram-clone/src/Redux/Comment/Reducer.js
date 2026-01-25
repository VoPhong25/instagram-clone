import { CREATE_COMMENT, DELETE_COMMENT, GET_POST_COMMENT, LIKE_COMMENT, UPDATE_COMMENT } from "./ActionType"

const initiaValue = {
    createComment: null,
    postComment: null,
    likeComment: null,
    deleteComment: "",
    updateComment: null
}
export const CommentReducer = (store = initiaValue, { type, payload }) => {
    if (type === CREATE_COMMENT) {
        return { ...store, createComment: payload }
    }
    else if (type === GET_POST_COMMENT) {
        return { ...store, postComment: payload }
    }
     else if (type === LIKE_COMMENT) {
        return { ...store, likeComment: payload }
    } 
    else if (type === DELETE_COMMENT) {
        return { 
            ...store, 
            deleteComment: payload, 
            postComment: store.postComment?.filter((item) => item.id !== payload) 
        }
    } 
    else if (type === UPDATE_COMMENT) {
        return { ...store, updateComment: payload }
    }
    return store;
}