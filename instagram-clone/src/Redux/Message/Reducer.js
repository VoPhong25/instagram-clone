import { ADD_MESSAGE, GET_CONVERSATION, GET_LIST_PARTNER, SEND_MESSAGE } from "./ActionType";

const initialValue = {
  listPartner: [],
  conversation: []
};

export const MessageReducer = (store = initialValue, { type, payload }) => {

    if(type===GET_LIST_PARTNER){
        return {...store, listPartner:payload}
    } 
    else if(type===GET_CONVERSATION){
        return {...store, conversation:payload}
    }
      else if(type===ADD_MESSAGE){
        return {...store, conversation:[...store.conversation, payload]}
    }
      return store;
  }
