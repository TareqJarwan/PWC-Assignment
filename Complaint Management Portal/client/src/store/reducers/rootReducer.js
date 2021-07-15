import { combineReducers } from 'redux';
import complaintReducer from './complaintReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';

export default combineReducers({
    complaint: complaintReducer,
    error: errorReducer,
    auth: authReducer
})