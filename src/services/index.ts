import {
    createUser,
    createToken,
    refreshToken
} from './userServices';
import {
    getTodos,
    postTodo,
    putTodo,
    patchTodo,
    deleteTodo
} from './todoServices';

export const userServices = {
    createUser,
    createToken,
    refreshToken,
}

export const todoServices = {
    getTodos,
    postTodo,
    putTodo,
    patchTodo,
    deleteTodo
}