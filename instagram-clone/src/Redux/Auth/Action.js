import { getUserProfileAction } from "../User/Action";
import { SIGN_IN, SIGN_IN_FAILURE, SIGN_UP, VALIDATE_TOKEN } from "./ActionType";

const BASE_API = "http://localhost:5454/api/auth"

export const loginAction = (data) => async (dispatch) => {
    try {
        const res = await fetch(`${BASE_API}/signin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })

        if (!res.ok) {
            const errorData = await res.json().catch(() => ({ message: "Login failed" })); 
            throw new Error(errorData.message || "Invalid email or password");
        }

        const resData = await res.json();
        
        localStorage.setItem("token", resData.jwt);
        localStorage.setItem("loginStatus", JSON.stringify(resData.status));
        
        console.log("token: ", resData.jwt);
        
        dispatch(getUserProfileAction(resData.jwt));
        dispatch({type: SIGN_IN, payload: resData});

    } catch (error) {
        console.error("Login error:", error);
        dispatch({
            type: SIGN_IN_FAILURE, 
            payload: error.message 
        });
    }
}
export const signupAction = (data) => async (dispatch) => {
    try {
        const res = await fetch(`${BASE_API}/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        const user = await res.json();
        console.log("Signup: ", user)
        dispatch({type:SIGN_UP, payload:user});

    } catch (error) {
        console.error("Signup error:", error);
    }
}
export const validateTokenAction = (jwt) => async (dispatch) => {
    try {
        const res = await fetch(`${BASE_API}/validateToken`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                  Authorization: "Bearer " + jwt
            },
        })
        const validate = await res.json();
        console.log("validate: ", validate)
        dispatch({type:VALIDATE_TOKEN, payload:validate});

    } catch (error) {
        console.error("validate error:", error);
    }
}
export const sendVerificationCodeAction = (email) => async (dispatch) => {
    try {
        // Gọi API backend của bạn
        const res = await fetch(`${BASE_API}/sendVerificationCode`, {
            method: "POST",
            headers: { "Content-Type": "text/plain" }, 
            body: email
        });
        
        if (res.ok) {
            const data = await res.text();
            return true; 
        }
        return false;
    } catch (error) {
        console.log("Error", error);
        return false;
    }
}
export const resetPasswordWithCodeAction = (data) => async (dispatch) => {
    try {
        // data = { email: "...", code: "..." }
        const res = await fetch(`${BASE_API}/sendNewPassword`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
        
        if (res.ok) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log("Error", error);
        return false;
    }
}