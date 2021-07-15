import axios from "axios";
import {
    AUTH_ERROR,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    SET_USER_ROLE,
    USER_LOADED,
    USER_LOADING
} from "./types";
import {clearErrors, returnErrors} from "./errorActions";

// Check token and load user
export const loadUser = () => (dispatch, getState) => {
    dispatch(clearErrors());

    // User loading
    dispatch({type: USER_LOADING});

    axios.get('/api/auth/user', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: USER_LOADED,
                payload: res.data
            });
            dispatch(setRole(res.data.role));
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: AUTH_ERROR
            });
        });
}

// Register User
export const register = ({firstName, lastName, email, password, role}) => dispatch => {
    dispatch(clearErrors());

    // Headers
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }

    // Request body
    const body = JSON.stringify({firstName, lastName, email, password, role});

    axios.post('/api/users', body, config)
        .then(res => {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            });
            dispatch(setRole(res.data.user.role));
        })
        .catch(err => {
            dispatch({type: REGISTER_FAIL});
            dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));
        });
}

// Login User
export const login = ({email, password}) => dispatch => {
    dispatch(clearErrors());
    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // Request body
    const body = JSON.stringify({email, password});

    axios.post('/api/auth', body, config)
        .then(res => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            });
            dispatch(setRole(res.data.user.role));
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'));
            dispatch({type: LOGIN_FAIL});
        });
}

// Logout User
export const logout = () => {
    return {
        type: LOGOUT_SUCCESS
    };
};

export const setRole = (role) => {
    return {
        type: SET_USER_ROLE,
        payload: role === 'admin'
    }
};

// Setup config/header and token
export const tokenConfig = getState => {
    // Get token from localStorage
    const token = getState().auth.token;

    // Headers
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }

    // If token, add to headers
    if (token) {
        config.headers['x-auth-token'] = token;
    }

    return config;
}
