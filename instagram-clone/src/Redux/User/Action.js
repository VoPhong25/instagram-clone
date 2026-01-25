import { FOLLOW_USER, GET_POPULAR_USER, GET_USER_BY_ID, GET_USER_BY_USERNAME, GET_USERS_BY_USER_IDS, LOGOUT, REMOVE_USER_AVT, REQ_USER, SEARCH_USER, SEARCH_USER_MESSAGE, UPDATE_USER } from "./ActionType";
const BASE_API = "http://localhost:5454/api/user"
export const getUserProfileAction = (jwt) => async (dispatch) => {
    try {
          const res = await fetch(`${BASE_API}/profile`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + jwt
            }
        })
        const reqUser = await res.json()
         console.log("USER PROFILE DATA =", reqUser);
        dispatch({ type: REQ_USER, payload: reqUser });
    } catch (error) {
        console.log("catch :", error)
    }
}
export const findUserByUsernameAction = (data) => async (dispatch) => {
    const res = await fetch(`${BASE_API}/findUsername/${data.username}`, {
    
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + data.jwt

        }
    }
    );
    const user = await res.json();
    console.log("Find by username: ", user)
    dispatch({type:GET_USER_BY_USERNAME, payload:user});
}

export const getUserByIdAction = (data) => async (dispatch) => {
    try {
          const res = await fetch(`${BASE_API}/find/${data.userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + data.jwt
            }
        })
        const user = await res.json()
         console.log("USER PROFILE DATA =", user);
        dispatch({ type: GET_USER_BY_ID, payload: user });
    } catch (error) {
        console.log("catch :", error)
    }
}

export const findUserByUserIdsAction = (jwt) => async (dispatch) => {
    const res = await fetch(`${BASE_API}/`, {
    
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + jwt

        }
    }
    );
    const users = await res.json();
    console.log("Find by userIds: ", users)
    dispatch({type:GET_USERS_BY_USER_IDS, payload:users});
}
export const followUserAction = (data) => async (dispatch) => {
    const res = await fetch(`${BASE_API}/follow/${data.followUserId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + data.jwt
        }
    }
    );
    const user = await res.json();
    console.log("follow user: ", user)
    dispatch({type:FOLLOW_USER, payload:user});
}
export const searchUserAction = (data) => async (dispatch) => {
  try {
      const res = await fetch(`${BASE_API}/search?q=${data.query}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + data.jwt
        }
    }
    );
    const user = await res.json();
    console.log("search user: ", user)
    dispatch({type:SEARCH_USER, payload:user});
  } catch (error) {
    console.log("catch error: ", error)
  }
}
export const searchUserMessageAction = (data) => async (dispatch) => {
  try {
      const res = await fetch(`${BASE_API}/search?q=${data.query}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + data.jwt
        }
    }
    );
    const user = await res.json();
    console.log("search user message: ", user)
    dispatch({type:SEARCH_USER_MESSAGE, payload:user});
  } catch (error) {
    console.log("catch error: ", error)
  }
}
export const editUserAction = (data) => async (dispatch) => {
  try {
      const res = await fetch(`${BASE_API}/account/edit`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + data.jwt
        },
        body:JSON.stringify(data.data)
    }
    );
    const user = await res.json();
    console.log("edit user: ", user)
    dispatch({type:UPDATE_USER, payload:user});
  } catch (error) {
    console.log("catch error: ", error)
  }
}
export const removeAvtUserAction = (jwt) => async (dispatch) => {
  try {
      const res = await fetch(`${BASE_API}/account/removeAvt`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + jwt
        },
    }
    );
      const message = await res.text();
    console.log("REMOVE user: ", message)
    dispatch({type:REMOVE_USER_AVT, payload:message});
  } catch (error) {
    console.log("catch error: ", error)
  }
}
export const getPopularUserAction = (jwt) => async (dispatch) => {
    try {
          const res = await fetch(`${BASE_API}/popular`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + jwt
            }
        })
        const users = await res.json()
        console.log("STATUS =", res.status);

         console.log("Popular user =", users);
        dispatch({ type: GET_POPULAR_USER, payload: users });
    } catch (error) {
        console.log("catch :", error)
    }
}
export const logoutAction = () => async (dispatch) => {
    dispatch({ type: LOGOUT, payload: null });
};
export const changePasswordAction = (data) => async (dispatch) => {
    try {
        const res = await fetch(`${BASE_API}/password`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + data.jwt
            },
            body: JSON.stringify(data.data)
        });

        const resData = await res.json();

        if (res.ok) {
            return { success: true, message: resData.message };
        } else {
            throw new Error(resData.message || "Failed to change password");
        }
    } catch (error) {
        console.log("Change password error:", error);
        return { success: false, message: error.message };
    }
}