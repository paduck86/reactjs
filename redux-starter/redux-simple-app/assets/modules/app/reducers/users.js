import { combineReducers } from 'redux';
import {
  REQUEST_USERS, RECEIVE_USERS, USER_CLICKED
} from '../actions/users';

var userInitialState = {
    isFetching: false,
    users: []
};

function users (state = userInitialState, action) {
    switch (action.type) {
        case REQUEST_USERS:
            return Object.assign({}, state, {
                isFetching: true
            });
        case RECEIVE_USERS:
            return Object.assign({}, state, {
                isFetching: false,
                users: action.users
            });
        case USER_CLICKED:
            return state;
        default:
            return state;
    }
}

const usersReducer = combineReducers({
    users
});

export default usersReducer;
