import { CREATE_STORY, GET_ALL_STORY } from "./ActionType";

const BASE_API = "http://localhost:5454/api/story"
export const createStoryAction=(data)=>async(dispatch)=>{
    try {
        const res = await fetch(`${BASE_API}/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + data.jwt
            },
            body: JSON.stringify(data.data)
        })
        const story = await res.json();
        console.log("new story: ", story)
        dispatch({ type: CREATE_STORY, payload: story });
    } catch (error) {
        console.log("catch: ", error);
    }
}

export const findAllStoryAction=(data)=>async(dispatch)=>{
    try {
        const res = await fetch(`${BASE_API}/getAll/${data.userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + data.jwt
            }
        })
        const story = await res.json();
        console.log("all story of user : ", story)
        dispatch({ type: GET_ALL_STORY, payload: story });
    } catch (error) {
        console.log("catch: ", error);
    }
}