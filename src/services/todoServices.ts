/**
 * Here we add any request service to user
 */
import axios from 'axios';
import Config from 'react-native-config';

//Fetch API_URL from env file provided by react-native-config
const domain = Config.API_URL;


export const getTodos = (token: string) => {
    const url = `${domain}/todo/`;

    return axios.get(url, {
        headers: { Authorization: `Bearer ${token}` } 
    })
}

export const postTodo = (
    token: string,
    data: object
) => {
    const url = `${domain}/todo/`;

    return axios.post(url, 
        data,
        {
            headers: { Authorization: `Bearer ${token}` } 
        }
    )
}

export const putTodo = (
    token: string, 
    id: number, 
    data: object
) => {
    const url = `${domain}/todo/${id}/`;

    return axios.put(url, 
        data,
        {
            headers: { Authorization: `Bearer ${token}` } 
        }
    )
}

export const patchTodo = (
    token: string, 
    id: number, 
    data: object
) => {
    const url = `${domain}/todo/${id}/`;

    return axios.patch(url, 
        data,
        {
            headers: { Authorization: `Bearer ${token}` }
        }
    )
}

export const deleteTodo = (
    token: string,
    id: number
) => {
    const url = `${domain}/todo/${id}/`;

    return axios.delete(url,
        {
            headers: { Authorization: `Bearer ${token}` } 
        }
    )
}