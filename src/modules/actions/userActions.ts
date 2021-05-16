import constants from '../actionConstants';
import {
    userServices
} from '../../services';

const {
    //Create user
    CREATE_USER_SET_USER_NAME,
    CREATE_USER_SET_PASSWORD,
    CREATE_USER_REQUEST,
    CREATE_USER_SUCCESS,
    CREATE_USER_FAIL,
    //Create token
    CREATE_TOKEN_SET_USER_NAME,
    CREATE_TOKEN_SET_PASSWORD,
    CREATE_TOKEN_REQUEST,
    CREATE_TOKEN_SUCCESS,
    CREATE_TOKEN_FAIL,
    CREATE_TOKEN_RESET
} = constants;

/*
* Here are actions for creating a new user
*/
//This action is dipatched when user name InputField changes
export const createUserSetUserName = (payload) => {
    return (dispatch) => {
        dispatch({
            type: CREATE_USER_SET_USER_NAME,
            payload
        })
    }
}

//This action is dipatched when password InputField changes
export const createUserSetPassword = (payload) => {
    return (dispatch) => {
        dispatch({
            type: CREATE_USER_SET_PASSWORD,
            payload
        })
    }
}

/**
 * This function is responsable for creating a new user
 * Redux thunk middleware role here is to handle dispatched actions with async requests
 */
export const register = () => {
    return (dispatch, store) => {
        dispatch(createUserSetUserName(store().createUser.userName));
        dispatch(createUserSetPassword(store().createUser.password));
        if(!store().createUser.isReady) return;
        dispatch({ type: CREATE_USER_REQUEST, payload: true });
        return userServices.createUser(store().createUser.userName, store().createUser.password)
        .then((result) => {
            alert('User created successfully, Sign in to continue to your To Do screen');
            dispatch({ type: CREATE_USER_SUCCESS, payload: false });
            console.log(result);
        })
        .catch(err => {
            if (err.response) {
                if(err.response.data.username){
                    dispatch({ type: CREATE_USER_FAIL, payload: { isRequest: false, userNameErrorMessage: err.response.data.username[0] } });
                }
                if(err.response.data.password){
                    dispatch({ type: CREATE_USER_FAIL, payload: { isRequest: false, userPasswordErrorMessage: err.response.data.password[0] } });
                }
            }
            else {
                alert('Make sure you have a reliable internet connection!');
                return dispatch({ type: CREATE_TOKEN_FAIL, payload: { isRequest: false } });
            }
        })
    }
}

/*
* Here are actions for creating a new token
*/
//This action is dipatched when user name InputField changes
export const createTokenSetUserName = (payload) => {
    return (dispatch) => {
        dispatch({
            type: CREATE_TOKEN_SET_USER_NAME,
            payload
        })
    }
}

//This action is dipatched when password InputField changes
export const createTokenSetPassword = (payload) => {
    return (dispatch) => {
        dispatch({
            type: CREATE_TOKEN_SET_PASSWORD,
            payload
        })
    }
}

/**
 * This function is responsable for creating a new token
 * Redux thunk middleware role here is to handle dispatched actions with async requests
 */
export const login = () => {
    return (dispatch, store) => {
        dispatch(createTokenSetUserName(store().createToken.userName));
        dispatch(createTokenSetPassword(store().createToken.password));
        if(!store().createToken.isReady) return;
        dispatch({ type: CREATE_TOKEN_REQUEST, payload: true });
        return userServices.createToken(store().createToken.userName, store().createToken.password)
        .then((result) => {
            dispatch({ type: CREATE_TOKEN_SUCCESS, payload: {data: result.data, isRequest: false} });
            console.log(result);
        })
        .catch(err => {
            if (err.response) {
                if(err.response.data.detail){
                    return dispatch({ type: CREATE_TOKEN_FAIL, payload: { isRequest: false, userPasswordErrorMessage: err.response.data.detail } });
                }
            }
            else {
                alert('Make sure you have a reliable internet connection!');
                return dispatch({ type: CREATE_TOKEN_FAIL, payload: { isRequest: false } });
            }
        })
    }
}

//This action resets createToken reducer to initial state
export const logout = () => {
    return (dispatch) => {
        dispatch({
            type: CREATE_TOKEN_RESET
        })
    }
}