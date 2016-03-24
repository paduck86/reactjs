import { combineReducers } from 'redux';
import {
    SELECT_SUBREDDIT, INVALIDATE_SUBREDDIT,
    REQUEST_POSTS, RECEIVE_POSTS
} from '../actions/actions';

/*  Reddit headlines
 {
     selectedSubreddit: 'frontend',
     postsBySubeddit: {
         frontend: {
             isFetching: true,
             didInvalidate: false,
             items: []
         },
         reactjs: {
             isFetching: false,
             didInvalidate: false,
             lastUpdated: 1439478405547,
             items: [{
                 id: 42,
                 title: 'Confusion about Flux and Relay'
             }, {
                 id: 500,
                 title: 'Creating a Simple Application Using React JS and Flux Architecture'
             }]
         }
     }
 }
 */



function selectedSubreddit(state = 'reactjs', action) {
    switch (action.type) {
        case SELECT_SUBREDDIT:
            return action.subreddit;
        default:
            return state;
    }
}

function posts(state = {
    isFetching: false,
    didInvalidate: false,
    items: []
}, action) {
    switch (action.type) {
        case INVALIDATE_SUBREDDIT:
            return Object.assign({}, state, {
                didInvalidate: true
            });
        case REQUEST_POSTS:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
                items: action.posts,
                lastupdated: action.receivedAt
            });
        case RECEIVE_POSTS:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                items: action.posts
            })
        default:
            return state;
    }
}

/*
    컴바인리듀서에 기술되었기 때문에, 진입접이 여기인것 뿐이지,
    이 펑션이 디스패치에서 호출되어지는 것은 아니다.
    걍 case문 안에있는 type의 진입접임.
 */
function postsBySubreddit(state = {}, action) {
    switch (action.type) {
        case INVALIDATE_SUBREDDIT:
        case RECEIVE_POSTS:
        case REQUEST_POSTS:
            return Object.assign({}, state, {
                [action.subreddit]: posts(state[action.subreddit], action)
            });
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    postsBySubreddit,
    selectedSubreddit
});

export default rootReducer;