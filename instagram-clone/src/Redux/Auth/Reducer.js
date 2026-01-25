
import { SIGN_IN, SIGN_UP, VALIDATE_TOKEN, SIGN_IN_FAILURE } from "./ActionType"

const initialValue = {
    signup: null,
    signin: null,
    validateToken: null,
    error: null,
    loading: false,
}

export const AuthReducer = (store = initialValue, { type, payload }) => {
    if (type === SIGN_UP) {
        return { 
            ...store, 
            signup: payload, 
            error: null,    
            loading: false 
        }
    } 

    else if (type === SIGN_IN) {
        return { 
            ...store, 
            signin: payload, 
            error: null, 
            loading: false 
        }
    } 

    else if (type === VALIDATE_TOKEN) {
        return { 
            ...store, 
            validateToken: payload, 
            error: null, 
            loading: false 
        }
    } 
    else if (type === SIGN_IN_FAILURE) { 
        return { 
            ...store, 
            error: payload, 
            loading: false 
        }
    }
    
    return store
}