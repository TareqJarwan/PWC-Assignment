import {ADD_COMPLAINT, COMPLAINTS_LOADING, GET_COMPLAINT, GET_COMPLAINTS, UPDATE_COMPLAINT} from '../actions/types';

const initialState = {
    complaint: null,
    complaints: [],
    loading: false
};

const complaintReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_COMPLAINT:
            return {
                ...state,
                complaint: action.payload,
                loading: false
            };
        case GET_COMPLAINTS:
            return {
                ...state,
                complaints: action.payload,
                loading: false
            };
        case ADD_COMPLAINT:
            return {
                ...state,
                complaints: [action.payload, ...state.complaints],
                loading: false
            };
        case UPDATE_COMPLAINT:
            let complaints = state.complaints.filter(item => item._id !== action.payload._id);
            complaints = [action.payload, ...complaints];
            return {
                ...state,
                complaints: complaints,
                loading: false
            }
        case COMPLAINTS_LOADING:
            return {
                ...state,
                loading: true
            };
        default:
            return state;
    }
}

export default complaintReducer;
