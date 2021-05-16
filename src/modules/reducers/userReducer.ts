import { 
    isUserNameValid,
    isEmpty
} from '../../util/validations';

const initialState = {
    userName: '',
    userNameErrorMessage: '',
    password: '',
    userPasswordErrorMessage: '',
    isRequest: false,
    isReady: false
}

/**
 * Here is createUser reducer
 */
const createUserReducer = (state = initialState, action) => {
    const { payload } = action;
    switch (action.type) {
        /**
         * Handle user name input change
         * Validate if user name is empty or not contains any character except letters, digits and @/./+/-/_ only. 
         */
        case 'CREATE_USER_SET_USER_NAME':
            state = {
                ...state,
                userName: payload,
                userNameErrorMessage: '',
                isReady: true
            }
            if(isEmpty(payload)){
                state = {
                    ...state,
                    userNameErrorMessage: 'User name is empty',
                    isReady: false
                }
            }
            else if(!isUserNameValid(payload)){
                state = {
                    ...state,
                    userNameErrorMessage: 'Name may contain letters, digits and @/./+/-/_ only',
                    isReady: false
                }
            }
            break;
        /**
         * Handle password input change
         * Validate if password is empty. 
         */
        case 'CREATE_USER_SET_PASSWORD':
            state = {
                ...state,
                password: payload,
                userPasswordErrorMessage: '',
                isReady: true
            }
            if(isEmpty(payload)){
                state = {
                    ...state,
                    userPasswordErrorMessage: 'Password is empty',
                    isReady: false
                }
            }
            break;
        //change isRequest to true to show ActivityIndicator till request is resolved
        case 'CREATE_USER_REQUEST':
            state = {
                ...state,
                isRequest: payload
            }
            break;
        //change isRequest to false and add data to store if exist
        case 'CREATE_USER_SUCCESS':
            state = {
                ...state,
                isRequest: payload
            }
            break;
        //If request fails then this handles errors resolved by adding new error message to store
        case 'CREATE_USER_FAIL':
            state = {
                ...state,
                ...payload
            }
            break;
    }
    return state;
};

/**
 * Here is createToken reducer
 */
const createTokenReducer = (state = initialState, action) => {
    const { payload } = action;
    switch (action.type) {
        /**
         * Handle user name input change
         * Validate if user name is empty. 
         */
        case 'CREATE_TOKEN_SET_USER_NAME':
            state = {
                ...state,
                userName: payload,
                userNameErrorMessage: '',
                isReady: true
            }
            if(isEmpty(payload)){
                state = {
                    ...state,
                    userNameErrorMessage: 'User name is empty',
                    isReady: false
                }
            }
            break;
        /**
         * Handle password input change
         * Validate if password is empty. 
         */
        case 'CREATE_TOKEN_SET_PASSWORD':
            state = {
                ...state,
                password: payload,
                userPasswordErrorMessage: '',
                isReady: true
            }
            if(isEmpty(payload)){
                state = {
                    ...state,
                    userPasswordErrorMessage: 'Password is empty',
                    isReady: false
                }
            }
            break;
        //change isRequest to true to show ActivityIndicator till request is resolved
        case 'CREATE_TOKEN_REQUEST':
            state = {
                ...state,
                isRequest: payload
            }
            break;
        //change isRequest to false and add data to store if exist
        case 'CREATE_TOKEN_SUCCESS':
            state = {
                ...state,
                isRequest: payload.isRequest,
                ...payload.data
            }
            break;
        //If request fails then this handles errors resolved by adding new error message to store
        case 'CREATE_TOKEN_FAIL':
            state = {
                ...state,
                ...payload
            }
            break;
        //Reset createToken state to initial state
        case 'CREATE_TOKEN_RESET':
            state = initialState
            break;
    }
    return state;
};

export {
    createUserReducer,
    createTokenReducer
};