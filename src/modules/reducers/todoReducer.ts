import { getYYYY_MM_DD } from '../../util/date';
import {
    isEmpty
} from '../../util/validations';

const todoState = {
    todosList: null,
    isGetTodosRequest: false
};


//-----------------------Get To Dos reducer----------------------------//


const getTodosReducer = (state = todoState, action) => {
    const { payload } = action;
    let index = -1;
    switch (action.type) {
        //change isGetTodosRequest to true to show ActivityIndicator till request is resolved
        case 'GET_TODOS_REQUEST':
            state = {
                ...state,
                isGetTodosRequest: payload
            }
        break;
        //If success set To Do array to todosList
        case 'GET_TODOS_SUCCESS':
            state = {
                ...state,
                ...payload
            }
            break;
        //If fail set isGetTodosRequest to false and todosList to empty array to show try again button
        case 'GET_TODOS_FAIL':
            state = {
                ...state,
                ...payload
            }
            break;
        /**
         * When post data to end point a copy of that data is added to todosList
         * Object is added first then spreed the rest of objects after  
         */
        case 'GET_TODOS_ADD_TODO':
            state = {
                ...state,
                todosList: [
                    payload,
                    ...state.todosList
                ]
            }
            break;
        /**
         * When put, patch data to end point a copy of that data is added to todosList
         * FindIndex method gets the current index by check if id from payload.data is equal to on of todoslist objects id if not exist return -1
         * To avoid mutating state slice method slices data to a object index spread it and add object then add + 1 to index to spread the rest of objects
         */
        case 'GET_TODOS_EDIT_TODO':
            index = state.todosList.findIndex(item => item.id == payload.id);
            if(index == -1) return;
            state = {
                ...state,
                todosList: [
                    ...state.todosList.slice(0, index),
                    payload,
                    ...state.todosList.slice(index + 1)
                ]
            }
            break;
        /**
         * When detete data from end point data is removed from todosList
         * FindIndex method gets the current index by check if id from payload.data is equal to on of todoslist objects id if not exist return -1
         * To avoid mutating state slice method slices data to a object index spread it then add index + 1 leaving the current index to spread the rest of objects
         */
        case 'GET_TODOS_REMOVE_TODO':
            index = state.todosList.findIndex(item => item.id == payload);
            if(index == -1) return;
            state = {
                ...state,
                todosList: [
                    ...state.todosList.slice(0, index),
                    ...state.todosList.slice(index + 1)
                ]
            }
            break;
}
    return state;
};

const postTodoState = {
    title: '',
    titleErrorMessage: '',
    content: '',
    contentErrorMessage: '',
    created: getYYYY_MM_DD(new Date()),
    dueDate: getYYYY_MM_DD(new Date()),
    dueDateErrorMessage: '',
    completed: false,
    isPostTodoRequest: false,
    isReady: false
};


//-----------------------Post To Do reducer----------------------------//


const postTodoReducer = (state = postTodoState, action) => {
    const { payload } = action;
    switch (action.type) {
        //change isPostTodoRequest to true to show ActivityIndicator till request is resolved
        case 'POST_TODO_SET_TITLE':
            state = {
                ...state,
                title: payload,
                titleErrorMessage: '',
                isReady: true
            }
            if(isEmpty(payload)){
                state = {
                    ...state,
                    titleErrorMessage: 'Title is empty, Title is a required field',
                    isPostTodoRequest: false,
                    isReady: false
                }
            }
        break;
        //If success set To Do array to todosList
        case 'POST_TODO_SET_CONTENT':
            state = {
                ...state,
                content: payload
            }
            break;
        //If fail set isPostTodoRequest to false and todosList to empty array to show try again button
        case 'POST_TODO_SET_DUE_DATE':
            state = {
                ...state,
                dueDate: payload
            }
            break;
        //Post To Do request change isPostTodoRequest to true to show ActivityIndicator till request is resolved
        case 'POST_TODO_REQUEST':
            state = {
                ...state,
                isPostTodoRequest: payload
            }
            break;
        /**
         * Post To Do request change isPostTodoRequest to false to hide ActivityIndicator
         * Reset all input state to initial state to clear form
         */
        case 'POST_TODO_SUCCESS':
            state = {
                ...state,
                isPostTodoRequest: payload,
                ...postTodoState
            }
            break;
        //Post To Do requset fail set isPostTodoRequest to false and view error message by changing one of titleErrorMessage ...etc
        case 'POST_TODO_FAIL':
            state = {
                ...state,
                ...payload
            }
            break;
    }
    return state;
};


//-----------------------Put To Do reducer----------------------------//


const putTodoState = {
    title: '',
    titleErrorMessage: '',
    content: '',
    contentErrorMessage: '',
    created: getYYYY_MM_DD(new Date()),
    dueDate: getYYYY_MM_DD(new Date()),
    dueDateErrorMessage: '',
    completed: false,
    isPatchTodoRequest: false,
    isReady: false,
    owner: 0
};

const patchTodoReducer = (state = putTodoState, action) => {
    const { payload } = action;
    switch (action.type) {
        //change isPatchTodoRequest to true to show ActivityIndicator till request is resolved
        case 'PATCH_TODO_SET_TITLE':
            state = {
                ...state,
                title: payload,
                titleErrorMessage: '',
                isReady: true
            }
            if(isEmpty(payload)){
                state = {
                    ...state,
                    titleErrorMessage: 'Title is empty, Title is a required field',
                    isPatchTodoRequest: false,
                    isReady: false
                }
            }
            break;
        //If success set To Do array to todosList
        case 'PATCH_TODO_SET_CONTENT':
            state = {
                ...state,
                content: payload
            }
            break;
        //If fail set isPatchTodoRequest to false and todosList to empty array to show try again button
        case 'PATCH_TODO_SET_DUE_DATE':
            state = {
                ...state,
                dueDate: payload
            }
            break;
        //Set all To Do data to putTodo state to update it later
        case 'PATCH_TODO_SET_DATA':
            state = {
                ...state,
                ...putTodoState,
                ...payload
            }
            break;
        //Put To Do request change isPatchTodoRequest to true to show ActivityIndicator till request is resolved
        case 'PATCH_TODO_REQUEST':
            state = {
                ...state,
                isPatchTodoRequest: payload
            }
            break;
        /**
         * Put To Do request change isPatchTodoRequest to false to hide ActivityIndicator
         * Reset all input state to initial state to clear form
         */
        case 'PATCH_TODO_SUCCESS':
            state = {
                ...state,
                isPatchTodoRequest: payload,
            }
            break;
        //patch To Do requset fail set isPatchTodoRequest to false and view error message by changing one of titleErrorMessage ...etc
        case 'PATCH_TODO_FAIL':
            state = {
                ...state,
                ...payload
            }
            break;
    }
    return state;
};


//-----------------------Delete To Dos reducer----------------------------//


const deleteTodoState = {
    isDeleteTodoRequest: false
};

const removeTodoReducer = (state = deleteTodoState, action) => {
    const { payload } = action;
    switch (action.type) {
        case 'DELETE_TODO_REQUEST':
            state = {
                ...state,
                isDeleteTodoRequest: payload
            }
        case 'DELETE_TODO_SUCCESS':
            state = {
                ...state,
                isDeleteTodoRequest: payload
            }
        case 'DELETE_TODO_FAIL':
            state = {
                ...state,
                isDeleteTodoRequest: payload
            }
    }
    return state;
}


//-----------------------Filter To Dos reducer----------------------------//


const filterTodoState = {
    filterTodosby: 'All'
};

const filterTodosReducer = (state = filterTodoState, action) => {
    const { payload } = action;
    switch (action.type) {
        case 'FILTER_TODOS_BY':
            state = {
                ...state,
                filterTodosby: payload
            }
    }
    return state;
}

export {
    getTodosReducer,
    postTodoReducer,
    patchTodoReducer,
    removeTodoReducer,
    filterTodosReducer
};