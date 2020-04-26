import Axios from 'axios';
import { API_URL } from '../../support/API_URL';
import {
    API_AUTH_START,
    API_AUTH_SUCCESS, 
    API_AUTH_FAILED, 
    LOGIN,
    LOGOUT,
    VERIFIED,
    MODAL_SHOW,
    LOGIN_FAILED
} from '../Types';

export const Register = form => {
    return dispatch => {
        dispatch({
            type : API_AUTH_START
        });
        Axios.post(`${API_URL}/users/register`, form)
        .then(res => {
            // console.log(res.data)
            let { id, username, email, address, phone, role_id, token, verification_id } = res.data.data;

            dispatch({
                type : LOGIN,
                payload : {
                    id,
                    username, 
                    email,
                    address,
                    phone,
                    role_id,
                    verification_id,
                    logged : true
                }
            });
            localStorage.setItem('token', token);
            dispatch({
                type : API_AUTH_SUCCESS
            });
        })
        .catch(err => {
            dispatch({
                type : API_AUTH_FAILED
            });
        })
    };
};

export const Login = (username, password) => {
    return dispatch => {
        Axios.post(`${API_URL}/users/login/`, {username, password})
        .then(res => {
            let { id, username, email, address, phone, role_id, token, verification_id } = res.data.data;
            // console.log(res.data)
            if (res.data.length !== 0) {
                dispatch({
                    type : LOGIN,
                    payload : {
                        id,
                        username, 
                        email,
                        address,
                        phone,
                        role_id,
                        verification_id,
                        logged : true
                    }
                });
                dispatch({
                    type : MODAL_SHOW
                });
            } else {
                dispatch({
                    type : LOGIN_FAILED
                });
            };
            localStorage.setItem('token', token);
            dispatch({
                type : API_AUTH_SUCCESS
            });
        })
        .catch(err => console.log(err))
    };
};

export const keepLogin = token => {
    // console.log('keeplogin')
    return async dispatch => {
        let token = localStorage.getItem('token');
        // console.log(token)
        try{        
            if(token){
                dispatch({
                    type : API_AUTH_START
                });
                let headers = {
                    headers : {
                        'Authorization' : `Bearer ${token}`
                    }
                };
                let res = await Axios.post(`${API_URL}/users/keep-login`, {} , headers);
                let { id, username, email, address, phone, role_id, token, verification_id } = res.data.data;
                dispatch({
                    type : LOGIN,
                    payload : {
                        id,
                        username, 
                        email,
                        address,
                        phone,
                        role_id,
                        verification_id,
                        logged : true
                    }
                });
                dispatch({
                    type : API_AUTH_SUCCESS
                });
            };
        }catch(err){
            dispatch({
                type : API_AUTH_FAILED
            });
        };
    };
};

export const Verification = form => {
    return async dispatch => {
        dispatch({
            type : API_AUTH_START
        });
        try{
            let res = await Axios.post(`${API_URL}/users/verification`, form);
            // true res.data.data
            dispatch({
                type : VERIFIED,
                payload : res.data.data
            });
            dispatch({
                type : API_AUTH_SUCCESS
            });
        }catch(err){
            // console.log(err, 'ini error')
            // console.log(err.status)
            // console.log(err.message)
            dispatch({
                type : API_AUTH_FAILED,
                payload : err.response
            });
        };
    };
};

export const LoginFailed = () => {
    return {
        type : LOGIN_FAILED
    };
};

export const Logout = () => {
    return dispatch => {
        localStorage.removeItem('token')
        dispatch({
            type : LOGOUT
        });
    };
};

