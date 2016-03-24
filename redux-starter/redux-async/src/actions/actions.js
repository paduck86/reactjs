import fetch from 'isomorphic-fetch';

export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT';
export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT';


/*  Reddit headlines
    {
        selectedSubreddit: 'frontend',
        postsBySubreddit: {
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

export function selectSubreddit(subreddit) {
    return {
        type: SELECT_SUBREDDIT,
        subreddit
    };
}

export function invalidateSubreddit(subreddit) {
    return {
        type: INVALIDATE_SUBREDDIT,
        subreddit
    };
}

function requestPosts(subreddit) {
    return {
        type: REQUEST_POSTS,
        subreddit
    };
}

function receivePosts(subreddit, json) {
    return {
        type: RECEIVE_POSTS,
        subreddit,
        posts: json.data.children.map(child => child.data), /* array내의 child를 child.data로 변환 */
        receiveAt: Date.now()
    };
}

/* thunk */
function fetchPosts(subreddit) {
    return dispatch => {
        // 첫번째 디스패치 앱 상태를 갱신하여 API호출이 시작됨을 알린다.
        dispatch(requestPosts(subreddit));

        /* thunk 미들웨어가 호출하는 함수는 값을 반환할 수 있고
           이 값이 디스패치 메서드의 반환값이 된다

           이 경우엔 기다릴 수 있는 약속을 반환한다
           thunk미들웨어에서 필수적인건 아니지막 우리의 편의를 위함이다
         */
        return fetch('http://www.reddit.com/r/' + subreddit + '.json')
            .then(response => response.json())
            .then(json =>
                /*
                    디스패치는 여러번 가능하다
                    여기서는 API 호출의 결과로 앱 상태를 갱신한다.
                 */
                dispatch(receivePosts(subreddit, json))
            );

            /*
                실제 앱에서는 네트워크 호출에서 에러도 잡고 싶을 것이다
             */
    }
}

function shouldFetchPosts(state, subreddit) {
    const posts = state.postsBySubreddit[subreddit];
    // 포스트가 없거나
    if (!posts) {
        return true;
    // 가져오는 중이거나
    } else if (posts.isFetching) {
        return false;
    // 새로고침한 시점에
    } else {
        return posts.didInvalidate;
    }
}

export function fetchPostsIfNeeded(subreddit) {
    /*
        함수가 getState()도 받는 것을 눈여겨보아라
        이를 통해 무엇을 보낼지 선택할 수 있다
        이는 혹시 이미 캐시된 값이 있을 경우
        네트워크 호출을 하지 않을 때 유용하다
     */
    return (dispatch, getState) => {
        if (shouldFetchPosts(getState(), subreddit)) {
            // 썽크에서 썽크를 보냄
            return dispatch(fetchPosts(subreddit));
        } else {
            // 호출하는 코드에게 아무것도 기다리지 않아도 된다는걸 알려준다
            return Promise.resolve();
        }
    };
}