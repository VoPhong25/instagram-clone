
import { 
    GET_DASHBOARD_ANALYTICS,
    GET_POST_ANALYTICS,
    GET_LIKE_ANALYTICS,
    GET_USER_ANALYTICS,
    GET_ALL_USERS,
    BAN_USER,
    UNBAN_USERS
} from "./ActionType";

const BASE_API = "http://localhost:5454/api/admin"
export const getDashboardAnalytics = (jwt) => async (dispatch) => {
 try {
          const res = await fetch(`${BASE_API}/analytics/dashboard`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + jwt
            }
        })
        const data = await res.json()
         console.log("analytics/dashboard: ", data);
        dispatch({ type: GET_DASHBOARD_ANALYTICS, payload: data });
    } catch (error) {
        console.log("catch :", error)
    }
}

export const getPostAnalytics = (jwt) => async (dispatch) => {
 try {
          const res = await fetch(`${BASE_API}/analytics/posts`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + jwt
            }
        })
        const data = await res.json()
         console.log("analytics/posts: ", data);
        dispatch({ type: GET_POST_ANALYTICS, payload: data });
    } catch (error) {
        console.log("catch :", error)
    }
}

export const getLikeAnalytics = (jwt) => async (dispatch) => {
 try {
          const res = await fetch(`${BASE_API}/analytics/likes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + jwt
            }
        })
        const data = await res.json()
         console.log("analytics/likess: ", data);
        dispatch({ type: GET_LIKE_ANALYTICS, payload: data });
    } catch (error) {
        console.log("catch :", error)
    }
}
export const getUserAnalytics = (jwt) => async (dispatch) => {
 try {
          const res = await fetch(`${BASE_API}/analytics/users`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + jwt
            }
        })
        const data = await res.json()
         console.log("analytics/users: ", data);
        dispatch({ type: GET_USER_ANALYTICS, payload: data });
    } catch (error) {
        console.log("catch :", error)
    }
}

export const getAllUsers = (jwt, query = "", page = 0, size = 10) => async (dispatch) => {
    try {
        const res = await fetch(`${BASE_API}/users?query=${query}&page=${page}&size=${size}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + jwt
            }
        });

        const data = await res.json();
        
        console.log("Get All Users Data:", data);

        dispatch({ type: GET_ALL_USERS, payload: data });
        
    } catch (error) {
        console.log("catch error getAllUsers:", error);
    }
};

export const banUser = (data) => async (dispatch) => {

    try {
            const res = await fetch(`${BASE_API}/users/${data.userId}/ban`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + data.jwt
            },
              body:JSON.stringify(data.data)
        });
        const results = await res.json();
        
        console.log("Ban User: ", results);
    
        dispatch({ type: BAN_USER, payload: results });

    } catch (error) {
        console.log("Error banning user:", error);

    }
};

export const unbanUser = (data) => async (dispatch) => {
    try {
            const res = await fetch(`${BASE_API}/users/${data.userId}/unban`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + data.jwt
            },
        });
        const results = await res.json();
        
        console.log("Unban User: ", results);
    
        dispatch({ type: UNBAN_USERS, payload: results });

    } catch (error) {
        console.log("Error Unbanning user:", error);

    }
};
