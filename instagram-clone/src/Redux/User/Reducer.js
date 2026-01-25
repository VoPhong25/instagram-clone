
import { FOLLOW_USER, GET_POPULAR_USER, GET_USER_BY_ID, GET_USER_BY_USERNAME, GET_USERS_BY_USER_IDS, LOGOUT, REMOVE_USER_AVT, REQ_USER, SEARCH_USER, SEARCH_USER_MESSAGE, UPDATE_USER } from "./ActionType"

const initiaValue = {
    reqUser: null,
    findByUsername: null,
    findUserByIds: [],
    findUserById: [],
    followUser: "",
    searchUser: [],
    searchUserMessage: [],
    editUser: null,
    removeUserAvt: "",
    popularUsers: [],

}
export const UserReducer = (store = initiaValue, { type, payload }) => {
    if (type === REQ_USER) {
        return { ...store, reqUser: payload }
    } else if (type === GET_USER_BY_USERNAME) {
        return { ...store, findByUsername: payload }
    } else if (type === GET_USERS_BY_USER_IDS) {
        return { ...store, findUserByIds: payload }
    } else if (type === GET_USER_BY_ID) {
        return { ...store, findUserById: payload }
    } else if (type === FOLLOW_USER) {
        const targetUser = payload; // user vừa follow / unfollow

        const isFollowing = store.reqUser.following.some(
            (u) => u.id === targetUser.id
        );

        return {
            ...store,

            // update reqUser
            reqUser: {
                ...store.reqUser,
                following: isFollowing
                    ? store.reqUser.following.filter((u) => u.id !== targetUser.id)
                    : [...store.reqUser.following, targetUser],
            },

            // update profile đang xem
            findByUsername: {
                ...store.findByUsername,
                followers: isFollowing
                    ? store.findByUsername.followers.filter(
                        (u) => u.id !== store.reqUser.id
                    )
                    : [...store.findByUsername.followers, store.reqUser],
            },
        };


    } else if (type === SEARCH_USER) {
        return { ...store, searchUser: payload }
    } else if (type === SEARCH_USER_MESSAGE) {
        return { ...store, searchUserMessage: payload }
    } else if (type === UPDATE_USER) {
        return { ...store, editUser: payload }
    } else if (type === REMOVE_USER_AVT) {
        return { ...store, removeUserAvt: payload }
    } else if (type === GET_POPULAR_USER) {
        return { ...store, popularUsers: payload }
    }
    else if (type === LOGOUT) {
        return initiaValue; 
    }
    return store;
}
