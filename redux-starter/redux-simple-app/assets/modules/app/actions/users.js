import fetch from 'isomorphic-fetch';
export const REQUEST_USERS = 'REQUEST_USER';
export const RECEIVE_USERS = 'RECEIVE_USERS';
export const USER_CLICKED = 'USER_CLICKED';

function requestUsers() {
    return {
        type: REQUEST_USERS
    };
}

function receiveUsers(json) {
    return {
        type: RECEIVE_USERS,
        users: json.data.users.map(user => user.data)
    }
}

export function getUsers() {
    return dispatch => {
        dispatch(requestUsers());
        return fetch('http://localhost:8080/users')
          .then(response => response.json())
          .then(json =>
              dispatch(receiveUsers(json))
          );
    };
}

export function onUserClick() {
    return {
        type: USER_CLICKED
    }
}
