import { CREATE_COMMENT, DELETE_COMMENT, GET_POST_COMMENT, LIKE_COMMENT, UPDATE_COMMENT } from "./ActionType";

const BASE_API = "http://localhost:5454/api/comment"

export const createCommentAction = (data) => async (dispatch) => {
    try {
        const res = await fetch(`${BASE_API}/create/${data.postId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + data.jwt
            },
            body: JSON.stringify(data.data)
        })
        const comment = await res.json();
        console.log("new comment: ", comment)
        dispatch({ type: CREATE_COMMENT, payload: comment });
    } catch (error) {
        console.log("catch: ", error);
    }
}
export const findCommentAction = (data) => async (dispatch) => {
    try {
        const res = await fetch(`${BASE_API}/comments/${data.postId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + data.jwt
            }
        })
        const comments = await res.json();
        console.log("find comments: ", comments)
        dispatch({ type: GET_POST_COMMENT, payload: comments });
    } catch (error) {
        console.log("catch: ", error);
    }
}
export const likeCommentAction = (data) => async (dispatch) => {
    try {
        const res = await fetch(`${BASE_API}/like/${data.commentId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + data.jwt
            }
        })
        const comment = await res.json();
        console.log("like comment: ", comment)
        dispatch({ type: LIKE_COMMENT, payload: comment });
    } catch (error) {
        console.log("catch: ", error);
    }
}
export const updateCommentAction = (data) => async (dispatch) => {
    try {
        const res = await fetch(`${BASE_API}/update/${data.commentId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + data.jwt
            }
        })
        const comment = await res.json();
        console.log("update comment: ", comment)
        dispatch({ type: UPDATE_COMMENT, payload: comment });
    } catch (error) {
        console.log("catch: ", error);
    }
}
export const deleteCommentAction = (data) => async (dispatch) => {
    try {
        const res = await fetch(`${BASE_API}/delete/${data.commentId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + data.jwt
            }
        })
       const resData = await res.json(); // Hoặc res.text() tùy backend trả về

        if (res.ok) {
            dispatch({ type: DELETE_COMMENT, payload: data.commentId });
            return { success: true, message: "Comment deleted" };
        } else {
            return { success: false, message: "Cannot delete comment" };
        }
    } catch (error) {
        console.log("catch error: ", error);
        return { success: false, message: "Network error" };
    }
}