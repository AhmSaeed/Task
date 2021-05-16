/**
 * Here we combine all app reducers in one object in combineReducers method
 */
import { combineReducers } from 'redux';
import {
    createUserReducer,
    createTokenReducer
} from '../modules/reducers/userReducer';
import {
    getTodosReducer,
    postTodoReducer,
    patchTodoReducer,
    filterTodosReducer
} from '../modules/reducers/todoReducer';
import Settings from '../modules/reducers/settingsReducer';

const makeRootReducer = () => {
    return combineReducers({
        createUser: createUserReducer,//This reducer manages Registration, input state changes, create user ...etc
        createToken: createTokenReducer,//This reducer manages Login, input state changes, create token ...etc
        getTodos: getTodosReducer,//This reducer manages To Do, get To Do's list ...etc
        postTodo: postTodoReducer,//This reducer manages add To Do form screen
        patchTodo: patchTodoReducer,//This reducer manages partially edit To Do form screen
        filterTodos: filterTodosReducer,//This reducer manages filter To Dos
        Settings,//This reducer manages app settings like toggle themes ...etc
    });
}

export default makeRootReducer;