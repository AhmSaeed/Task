import constants from '../actionConstants';
import {
    todoServices
} from '../../services';

const {
    //Get To Do
    GET_TODOS_REQUEST,
    GET_TODOS_SUCCESS,
    GET_TODOS_FAIL,
    GET_TODOS_ADD_TODO,
    GET_TODOS_EDIT_TODO,
    GET_TODOS_REMOVE_TODO,
    //Add new To Do
    POST_TODO_SET_TITLE,
    POST_TODO_SET_CONTENT,
    POST_TODO_SET_DUE_DATE,
    POST_TODO_REQUEST,
    POST_TODO_SUCCESS,
    POST_TODO_FAIL,
    //Update To Do
    PATCH_TODO_SET_DATA,
    PATCH_TODO_SET_TITLE,
    PATCH_TODO_SET_CONTENT,
    PATCH_TODO_SET_DUE_DATE,
    PATCH_TODO_REQUEST,
    PATCH_TODO_SUCCESS,
    PATCH_TODO_FAIL,
    //Delete ToDo
    DELETE_TODO_REQUEST,
    DELETE_TODO_SUCCESS,
    DELETE_TODO_FAIL,
    //Filter To DO
    FILTER_TODOS_BY
} = constants;


//-----------------------Get To Dos actions----------------------------//

/**
 * This function is responsable for getting all To Do's
 * Redux thunk middleware role here is to handle dispatched actions with async requests
 * Here is todos reducer Actions
 */
export const fetchTodos = () => {
    return (dispatch, store) => {
        dispatch({ type: GET_TODOS_REQUEST, payload: true });
        return todoServices.getTodos(store().createToken.access)
        .then((result) => {
            console.log(result);
            dispatch({ type: GET_TODOS_SUCCESS, payload: { isGetTodosRequest: false, todosList: result.data } });
        })
        .catch(err => {
            dispatch({ type: GET_TODOS_FAIL, payload: { isGetTodosRequest: false, todosList: [] } });
        })
    }
}

/**
 * addTodo action handles adding new To Do to todosList
 * It add data offline causing state change so added data appears among the list
 * When post object to end point it change offline object with a copy from endpoint object
 */
export const addTodo = (data: object) => {
    return (dispatch) => {
        dispatch({
            type: GET_TODOS_ADD_TODO,
            payload: data
        })
    }
}

/**
 * editTodo action handles edit To Do in todosList
 * It modify data offline causing state change so added data appears among the list
 * When put, patch object to end point it change offline object with a copy from endpoint object
 */
export const editTodo = (data: object) => {
    return (dispatch) => {
        dispatch({
            type: GET_TODOS_EDIT_TODO,
            payload: data
        })
    }
}

/**
 * deleteTodo action handles delete To Do from todosList
 * It deletes data offline causing state change so added data appears among the list
 * When delete object from end point it change offline object with a copy from endpoint object
 */
export const removeTodo = (id: number) => {
    return (dispatch) => {
        dispatch({
            type: GET_TODOS_REMOVE_TODO,
            payload: id
        })
    }
}


//-----------------------Post To Do actions----------------------------//


/**
 * This actions is to handle add To Do form
 * Here is postTodo reducer Actions
 * This action handles title input change in add To Do screen
 */
export const postTodoSetTitle = (payload: string) => {
    return (dispatch) => {
        dispatch({
            type: POST_TODO_SET_TITLE,
            payload
        })
    }
}

//This action handles content input change in add To Do screen
export const postTodoSetContent = (payload: string) => {
    return (dispatch) => {
        dispatch({
            type: POST_TODO_SET_CONTENT,
            payload
        })
    }
}

//This action handles content input change in add To Do screen
export const postTodoSetDueDate = (payload: string) => {
    return (dispatch) => {
        dispatch({
            type: POST_TODO_SET_DUE_DATE,
            payload
        })
    }
}

//This async function handles create To Do with end point
export const createTodo = () => {
    return (dispatch, store) => {
        dispatch(postTodoSetTitle(store().postTodo.title));
        if(!store().postTodo.isReady) return;
        dispatch({ type: POST_TODO_REQUEST, payload: true });
        const data = {
            title: store().postTodo.title,
            content: store().postTodo.content,
            due_date: store().postTodo.dueDate,
            created: store().postTodo.created,
            completed: store().postTodo.completed,
        }
        return todoServices.postTodo(store().createToken.access, data)
        .then((result) => {
            console.log(result);
            alert('To Do is added successfully!');
            dispatch(addTodo(result.data));
            dispatch({ type: POST_TODO_SUCCESS, payload: false });
        })
        .catch(err => {
            console.log(err.response);
            if (err.response) {
                if(err.response.data.title){
                    return dispatch({ type: POST_TODO_FAIL, payload: { isPostTodoRequest: false, titleErrorMessage: err.response.data.title[0] } });
                }
                if(err.response.data.content){
                    return dispatch({ type: POST_TODO_FAIL, payload: { isPostTodoRequest: false, contentErrorMessage: err.response.data.content[0] } });
                }
                if(err.response.data.due_date){
                    return dispatch({ type: POST_TODO_FAIL, payload: { isPostTodoRequest: false, dueDateErrorMessage: err.response.data.due_date[0] } });
                }
            }
            else {
                alert('Make sure you have a reliable internet connection!');
                dispatch({ type: POST_TODO_FAIL, payload: { isPostTodoRequest: false } });
            }
        })
    }
}


//-----------------------Patch To Do actions----------------------------//


/**
 * This actions is to handle edit To Do form
 * Here is putTodo reducer Actions
 * This action handles title input change in edit To Do screen
 */
export const patchTodoSetTitle = (payload: string) => {
    return (dispatch) => {
        dispatch({
            type: PATCH_TODO_SET_TITLE,
            payload
        })
    }
}

//This action handles content input change in add To Do screen
export const patchTodoSetContent = (payload: string) => {
    return (dispatch) => {
        dispatch({
            type: PATCH_TODO_SET_CONTENT,
            payload
        })
    }
}

//This action handles due date input change in add To Do screen
export const patchTodoSetDueDate = (payload: string) => {
    return (dispatch) => {
        dispatch({
            type: PATCH_TODO_SET_DUE_DATE,
            payload
        })
    }
}

//This action override all To Do data in putTodo state to use it in edit To Do screen
export const patchTodoSetData = (payload: object) => {
    return (dispatch) => {
        dispatch({
            type: PATCH_TODO_SET_DATA,
            payload
        })
    }
}

//This async function handles update To Do with end point
export const partialyUpdateTodo = (navigateToHome: Function) => {
    return (dispatch, store) => {
        dispatch(patchTodoSetTitle(store().patchTodo.title));
        if(!store().patchTodo.isReady) return;
        dispatch({ type: PATCH_TODO_REQUEST, payload: true });
        const data = {
            title: store().patchTodo.title,
            content: store().patchTodo.content,
            due_date: store().patchTodo.dueDate,
            created: store().patchTodo.created,
            completed: store().patchTodo.completed,
        }
        return todoServices.patchTodo(store().createToken.access, store().patchTodo.id, data)
        .then((result) => {
            console.log(result);
            alert('To Do is updated successfully!');
            navigateToHome();
            dispatch(editTodo(result.data));
            dispatch({ type: PATCH_TODO_SUCCESS, payload: false });
        })
        .catch(err => {
            console.log(err.response);
            if (err.response) {
                if(err.response.data.title){
                    return dispatch({ type: PATCH_TODO_FAIL, payload: { isPatchTodoRequest: false, titleErrorMessage: err.response.data.title[0] } });
                }
                if(err.response.data.content){
                    return dispatch({ type: PATCH_TODO_FAIL, payload: { isPatchTodoRequest: false, contentErrorMessage: err.response.data.content[0] } });
                }
                if(err.response.data.due_date){
                    return dispatch({ type: PATCH_TODO_FAIL, payload: { isPatchTodoRequest: false, dueDateErrorMessage: err.response.data.due_date[0] } });
                }
            }
            else {
                alert('Make sure you have a reliable internet connection!');
                dispatch({ type: PATCH_TODO_FAIL, payload: { isPostTodoRequest: false } });
            }
        })
    }
}

//This async function handles update To Do 
export const changeTodoStatus = (index, id, completed) => {
    return (dispatch, store) => {
        dispatch({ type: PATCH_TODO_REQUEST, payload: true });
        return todoServices.patchTodo(store().createToken.access, id, {completed})
        .then((result) => {
            dispatch(editTodo(result.data));
            dispatch({ type: PATCH_TODO_SUCCESS, payload: false });
        })
        .catch(err => {
            alert('Make sure you have a reliable internet connection!');
            dispatch({ type: PATCH_TODO_SUCCESS, payload: false });
        })
    }
    
}



//-----------------------Delete To Do actions----------------------------//


/**
 * This actions is to handle delete To Dos
 * Here is deleteTodo reducer Actions
 * This action handles delete To Do from endpoint and from todosList array
 */
export const deleteTodo = (id) => {
    return (dispatch, store) => {
        dispatch({ type: DELETE_TODO_REQUEST, payload: true });
        return todoServices.deleteTodo(store().createToken.access, id)
        .then((result) => {
            dispatch(removeTodo(id));
            dispatch({ type: DELETE_TODO_SUCCESS, payload: false });
        })
        .catch(err => {
            alert('Make sure you have a reliable internet connection!');
            dispatch({ type: DELETE_TODO_FAIL, payload: false });
        })
    }
    
}


//-----------------------Filter To Do actions----------------------------//


/**
 * This actions is to handle filter To Dos
 * Here is filterToDos reducer Actions
 * This action handles add current filter state to filterTodo state
 */
export const filterTodosBy = (payload: string) => {
    return (dispatch) => {
        dispatch({
            type: FILTER_TODOS_BY,
            payload
        })
    }
}