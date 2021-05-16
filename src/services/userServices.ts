/**
 * Here we add any request service to user
 */
import axios from 'axios';
import Config from 'react-native-config';

//Fetch API_URL from env file provided by react-native-config
const domain = Config.API_URL;


export const createUser = (
    username: string, 
    password: string
) => {
    const url = `${domain}/api/register`;

    return axios.post(url, {
        username,
        password
    })
}

export const createToken = (
    username: string, 
    password: string
) => {
    const url = `${domain}/api/token/`;

    return axios.post(url, {
        username,
        password
    })
}

export const refreshToken = (
    token: string
) => {
    const url = `${domain}/api/token/refresh`;

    return axios.post(url, {
        token
    })
}