import { CREATE_NEW_POST, DELETE_POST, GET_BY_USER_ID, GET_BY_USER_IDS, GET_SINGLE_POST, LIKE_POST, SAVE_POST } from "./ActionType";

const BASE_API = "http://localhost:5454/api/post"
export const createPostAction = (data)=> async(dispatch)=>{
  try {
      const res = await fetch(`${BASE_API}/create`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            Authorization:"Bearer "+data.jwt
        },
        body:JSON.stringify(data.data),
    })
    const post = await res.json();
    console.log("create post: " , post)
    dispatch({type:CREATE_NEW_POST, payload:post})
  } catch (error) {
    console.log("catch: ", error)
  }
}
export const findPostByUserIdsAction = (jwt)=> async(dispatch)=>{
  try {
      const res = await fetch(`${BASE_API}/following`,{
        method:"GET",
        headers:{
            "Content-Type":"application/json",
            Authorization:"Bearer "+jwt
        }
    })
    const posts = await res.json();
    console.log("find post by user ids: ", posts)
    dispatch({type:GET_BY_USER_IDS, payload:posts})
  } catch (error) {
    console.log("catch: ", error)
  }
}
export const findPostByUserIdAction = (data)=> async(dispatch)=>{
  try {
      const res = await fetch(`${BASE_API}/all/${data.userId}`,{
        method:"GET",
        headers:{
            "Content-Type":"application/json",
            Authorization:"Bearer "+data.jwt
        }
    })
    const post = await res.json();
    console.log("find post by user id: ", post)
    dispatch({type:GET_BY_USER_ID, payload:post})
  } catch (error) {
    console.log("catch: ", error)
  }
}
export const likePostAction = (data)=> async(dispatch)=>{
  try {
      const res = await fetch(`${BASE_API}/likePost/${data.postId}`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            Authorization:"Bearer "+data.jwt
        }
    })
    const post = await res.json();
    console.log("like post : ", post)
    dispatch({type:LIKE_POST, payload:post})
  } catch (error) {
    console.log("catch: ", error)
  }
}
// Redux/Post/Action.js

export const deletePostAction = (data) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_API}/delete/${data.postId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.jwt,
      },
    });

    const resData = await res.json(); 

    if (res.ok) {
      dispatch({ type: DELETE_POST, payload: data.postId });
      return { success: true, message: resData.message };
    } else {
      return { success: false, message: resData.message || "Cannot delete this post" };
    }
  } catch (error) {
    console.log("catch error: ", error);
    return { success: false, message: "Network error (Check Console)" };
  }
};
export const savePostAction = (data)=> async(dispatch)=>{
  try {
      const res = await fetch(`${BASE_API}/savedPost/${data.postId}`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            Authorization:"Bearer "+data.jwt
        }
    })
    const message = await res.text();
    console.log("message: ", message)
    dispatch({type:SAVE_POST, payload:message})
  } catch (error) {
    console.log("catch: ", error)
  }
}
export const findPostByIdAction = (data)=> async(dispatch)=>{
  try {
      const res = await fetch(`${BASE_API}/${data.postId}`,{
        method:"GET",
        headers:{
            "Content-Type":"application/json",
            Authorization:"Bearer "+data.jwt
        }
    })
    const post = await res.json();
    console.log("single post : ", post)
    dispatch({type:GET_SINGLE_POST, payload:post})
  } catch (error) {
    console.log("catch: ", error)
  }
}