import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getUsers, onUserClick } from '../actions/users';

class Users extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(getUsers());
    }

    componentWillReceiveProps(nextProps) {

    }

    onUserClick(e) {
        e.preventDefault();
        const { dispatch } = this.props;
        dispatch(onUserClick());
    }

    render() {
        return (
            <Users
                users={this.props.users}
                onClick={this.onUserClick}
            />
        );
    }
}

Users.propTypes = {
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        users: state.userReducer.users
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
export default connect(mapStateToProps)(Users);
