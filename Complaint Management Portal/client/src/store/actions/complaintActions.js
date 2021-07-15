import axios from 'axios';
import {ADD_COMPLAINT, COMPLAINTS_LOADING, GET_COMPLAINT, GET_COMPLAINTS, UPDATE_COMPLAINT} from './types';
import {clearErrors, returnErrors} from './errorActions';
import {tokenConfig} from "./authActions";

// get only single complaint by id
export const getComplaint = id => (dispatch, getState) => {
    dispatch(clearErrors());
    dispatch(setComplaintsLoading());
    axios.get(`/api/complaints/:${id}`, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: GET_COMPLAINT,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};

// to get all complaints for the normal user
export const getUserComplaints = () => (dispatch, getState) => {
    dispatch(clearErrors());
    const userId = getState().auth.user._id;
    dispatch(setComplaintsLoading());
    axios.get(`/api/complaints/user/${userId}`, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: GET_COMPLAINTS,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};

export const addComplaint = complaint => (dispatch, getState) => {
    dispatch(clearErrors());
    axios.post('/api/complaints', complaint, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: ADD_COMPLAINT,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};

// ADMIN ACTIONS
// to get All complaints -> admin
export const getComplaints = () => (dispatch, getState) => {
    dispatch(clearErrors());
    dispatch(setComplaintsLoading());
    axios.get('/api/complaints', tokenConfig(getState))
        .then(res =>
            dispatch({
                type: GET_COMPLAINTS,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};

// update Complaint
export const updateComplaint = (id, acction) => (dispatch, getState) => {
    dispatch(clearErrors());
    axios.put(`/api/complaints/${id}?action=${acction}`, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: UPDATE_COMPLAINT,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};

// Accept Complaint
export const acceptComplaint = id => dispatch => {
    dispatch(updateComplaint(id, "accept"));
};

// Reject Complaint
export const rejectComplaint = id => dispatch => {
    dispatch(updateComplaint(id, "reject"));
};

export const setComplaintsLoading = () => {
    return {
        type: COMPLAINTS_LOADING
    };
};
