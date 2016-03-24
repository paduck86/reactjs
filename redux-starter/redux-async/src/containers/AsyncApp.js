import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { selectSubreddit, fetchPostsIfNeeded, invalidateSubreddit } from '../actions/actions';
import Picker from '../components/Picker';
import Posts from '../components/Posts';

class AsyncApp extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this); /* setState하겠다는 뜻 */
        this.handleRefreshClick = this.handleRefreshClick.bind(this);
    }
    
    componentDidMount() {
        // connect()에 의해 dispatch를 props로 받게 됨.
        const { dispatch, selectedSubreddit } = this.props;
        dispatch(fetchPostsIfNeeded(selectedSubreddit));
    }

    /*
        Invoked when a component is receiving new props.
        This method is not called for the initial render.

        Use this as an opportunity to react to a prop transition
        before render() is called by updating the state using this.setState().
        The old props can be accessed via this.props.
        Calling this.setState() within this function will not trigger an additional render.
     */
    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedSubreddit !== this.props.selectedSubreddit) {
            const { dispatch, selectedSubreddit } = nextProps;
            dispatch(fetchPostsIfNeeded(selectedSubreddit));    
        }
    }
    
    handleChange(nextSubreddit) {
        this.props.dispatch(selectSubreddit(nextSubreddit));
    }
    
    handleRefreshClick(e) {
        e.preventDefault();
        
        const { dispatch, selectedSubreddit } = this.props;
        dispatch(invalidateSubreddit(selectedSubreddit));
        dispatch(fetchPostsIfNeeded(selectedSubreddit));
    }
    
    render() {
        const { selectedSubreddit, posts, isFetching, lastUpdated } = this.props;
        return (
            <div>
                <Picker value={selectedSubreddit}
                        onChange={this.handleChange}
                        options={[ 'reactjs', 'frontend' ]} />
                <p>
                    {lastUpdated &&
                        <span>
                            Last updated at {new Date(lastUpdated).toLocaleTimeString()},
                            {' '}
                        </span>
                    }
                    {!isFetching &&
                        <a href="#"
                            onClick={this.handleRefreshClick}>
                            Refresh
                        </a>
                    }
                </p>
                {isFetching && posts && posts.length === 0 &&
                    <h2>Loading...</h2>
                }
                {!isFetching && posts && posts.length === 0 &&
                    <h2>Empty.</h2>
                }
                {posts && posts.length > 0 &&
                    <div style={{ opacity: isFetching ? 0.5 : 1 }}>
                        <Posts posts={posts} />
                    </div>
                }
            </div>
        );
    }
}

/*
    타입이 맞지 않으면 콘솔에 warning
 */
AsyncApp.propTypes = {
    selectedSubreddit: PropTypes.string.isRequired,
    posts: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    const { selectedSubreddit, postsBySubreddit } = state;
    const {
        isFetching,
        lastUpdated,
        items: posts
    } = postsBySubreddit[selectedSubreddit] || {
        isFetching: true,
        items: []
    }

    return {
        selectedSubreddit,
        posts,
        isFetching,
        lastUpdated
    };
} 

/*
    connect() 호출로 감싸진 컴포넌트는 dispatch 함수를 prop으로 받게 되고,
    필요한 상태는 전역에서 가져오게 된다. connect()의 유일한 인수는 selector라고 부를 함수 하나뿐이다.
    이 함수는 전역 Redux스토어의 상태를 받아서 컴포넌트가 필요로 하는 props를 반환한다.
    가장 간단하게는 받은 state를 그대로 반환할수도 있겠지만 아마도 상태를 반환하기 전에 변환하고 싶을 것이다.
    
    조합 가능한 셀렉터를 이용해 변환을 메모이즈하고 싶다면 reselect를 알아보라 이 예제에서는 사용하지 않지만 
    더 큰 앱에서는 유용할 것이다. 
*/
export default connect(mapStateToProps)(AsyncApp);