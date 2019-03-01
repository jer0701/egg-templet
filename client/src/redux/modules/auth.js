import { get, post } from "../../utils/request";
import url from "../../utils/url";
import { actions as appActions } from "./app";

const initialState = {
    username: null
};
  
// action types
export const types = {
    LOGIN: "AUTH/LOGIN",    //登录
    LOGOUT: "AUTH/LOGOUT"   //注销
};

// action creators
export const actions = {
    login: (username, password, remember) => {
        return dispatch => {
            dispatch(appActions.startRequest());
            const params = { username, password, remember };
            return post(url.login(), params).then(res => {
                dispatch(appActions.finishRequest());
                if(!res.error && res.code === 200) {
                    dispatch(actions.setLoginInfo(res.data.username));
                }

                return res;
            })
        }
    },

    logout: () => {
        return dispatch => {
            return get(url.logout()).then(res => {
                console.log(res);
                dispatch({type: types.LOGOUT});
                return res;
            })
        }
    },

    register: (email, password, confirm, username) => {
        return dispatch => {
            dispatch(appActions.startRequest());
            const params = { email, password, confirm, username};
            return post(url.register(), params).then(res => {
                dispatch(appActions.finishRequest());
                return res;
            })
        }
    },

    getAuth: () => dispatch => {
        return get(url.auth()).then(res => {
            if(!res.error && res.code === 200) {
                dispatch(actions.setLoginInfo(res.data.username));
            }
        });
    },
    
    setLoginInfo: (username) => ({
        type: types.LOGIN,
        username: username
    })
}

// reducers
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.LOGIN:
          return { ...state, username: action.username };
        case types.LOGOUT:
          return { ...state, username: null };
        default:
          return state;
    }
}

export default reducer;

// selectors
export const getLoggedUser = state => state.auth;