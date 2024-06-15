// userActions.js

import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
} from '../constants/userConstants';

export const connectMetaMask = () => async (dispatch) => {
    try {
        dispatch({ type: USER_LOGIN_REQUEST });

        // Check if MetaMask is installed
        if (typeof window.ethereum !== 'undefined') {
            // Request account access
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const account = accounts[0];

            // Dispatch success with the Ethereum account address
            dispatch({
                type: USER_LOGIN_SUCCESS,
                payload: { account: account }
            });

            // Store user's Ethereum address in local storage
            localStorage.setItem('userInfo', JSON.stringify({ account }));
        } else {
            throw new Error('MetaMask is not installed. Please install it to use this app.');
        }
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.message || 'Failed to connect MetaMask'
        });
    }
};

export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo');
    dispatch({ type: USER_LOGOUT });
};
