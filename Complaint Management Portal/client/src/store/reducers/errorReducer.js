import { GET_ERRORS, CLEAR_ERRORS } from "../actions/types";

const initialState = {
    msg: {},
    status: null,
    id: null
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ERRORS:
            const { msg, status, id } = action.payload;
            return {
                msg, status, id
            }
        case CLEAR_ERRORS:
            return initialState;
        default:
            return state;
    }
}

export default authReducer;