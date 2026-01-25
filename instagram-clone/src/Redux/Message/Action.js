import { GET_CONVERSATION, GET_LIST_PARTNER, SEND_MESSAGE } from "./ActionType";

const BASE_API = "http://localhost:5454/api/messages"
export const getListPartnerAction = (jwt) => async (dispatch) => {
    try {
          const res = await fetch(`${BASE_API}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + jwt
            }
        })
        const listPartner = await res.json()
         console.log("List partner:  ", listPartner);
        dispatch({ type: GET_LIST_PARTNER, payload: listPartner });
    } catch (error) {
        console.log("catch :", error)
    }
}
export const getConversationAction = (data) => async (dispatch) => {
    try {
          const res = await fetch(`${BASE_API}/${data.otherId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + data.jwt
            }
        })
        const conversation = await res.json()
         console.log("conversation :  ", conversation);
        dispatch({ type: GET_CONVERSATION, payload: conversation });
    } catch (error) {
        console.log("catch :", error)
    }
}
export const sendMessageAction = (data) => async (dispatch) => {
    try {
          const res = await fetch(`${BASE_API}/${data.recipientId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + data.jwt
            },        body: JSON.stringify(data)
        })
    } catch (error) {
        console.log("catch :", error)
    }
}