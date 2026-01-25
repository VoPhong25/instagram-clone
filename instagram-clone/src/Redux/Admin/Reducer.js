// File: src/Redux/Admin/AdminReducer.js

import {
    GET_DASHBOARD_ANALYTICS,
    GET_POST_ANALYTICS,
    GET_LIKE_ANALYTICS,
    GET_USER_ANALYTICS,
    GET_ALL_USERS,
    BAN_USER,
    UNBAN_USERS
} from "./ActionType";

// 1. THÊM LOADING VÀO INITIAL STATE
const initialState = {
    dashboard: null,
    postAnalytics: null,
    likeAnalytics: null,
    userAnalytics: null,
    users: [],
    loading: {        
        allUsers: false,
        banUser: false,
        unbanUser: false
    },
    error: null
};

export const AdminReducer = (store = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case GET_DASHBOARD_ANALYTICS:
            return { ...store, dashboard: payload };

        case GET_POST_ANALYTICS:
            return { ...store, postAnalytics: payload };

        case GET_LIKE_ANALYTICS:
            return { ...store, likeAnalytics: payload };

        case GET_USER_ANALYTICS:
            return { ...store, userAnalytics: payload };

        case GET_ALL_USERS:
            return { 
                ...store, 
                users: payload, 
                loading: { ...store.loading, allUsers: false } 
            };

        case BAN_USER:
            return {
                ...store,
                users: store.users.map((user) => 
                    user.id === payload.id ? payload : user
                ),
                loading: { ...store.loading, banUser: false }
            };

        case UNBAN_USERS:
            return {
                ...store,
                users: store.users.map((user) => 
                    user.id === payload.id ? payload : user
                ),
                loading: { ...store.loading, unbanUser: false }
            };

        default:
            return store;
    }
};