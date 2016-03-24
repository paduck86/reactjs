import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { addTodo, completeTodo, setVisibilityFilter, VisibilityFilters } from '../actions';
import AddTodo from '../components/AddTodo';
import TodoList from '../components/TodoList';
import Footer from '../components/Footer';

class App extends  Component {
    render() {
        // connect() 호출을 통해 주입됨
        const { dispatch, visibleTodos, visibilityFilter } = this.props;
        return {
            <div>
                <AddTodo
                    onAddClick={text =>
                        dispatch(addTodo(text))
                    }
                />
                <TodoList
                    todos={visibleTodos}
                    onTodoClick={index =>
                        dispatch(completeTodo(index))
                    }
                />
                <Footer
                    filter={visibilityFilter}
                    onFilterChange={nextFilter =>
                        dispatch(setVisibilityFilter(nextFilter))
                    }
                />
            </div>
        };
    }
}

App.propTypes = {
  visibleTodos: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired
  })),
  visibilityFilter: PropTypes.ondeOf([
      'SHOW_ALL',
      'SHOW_COMPLETED',
      'SHOW_ACTIVE'
  ]).isRequired
};

function selectTodos(todos, filter) {
    switch (filter) {
        case VisibilityFilters.SHOW_ALL:
            return todos;
        case VisibilityFilters.SHOW_COMPLETED:
            return todos.filter(todo => todo.completed);
        case VisibilityFilters.SHOW_ACTIVE:
            return todos.filter(todo => !todo.completed);
    }
}

// 주어진 전역 상태에서 어떤 props를 주입하길 원하는가
// 노트 더나은 성능을 위해서 https://github.com/faassen/reselect 를 사용하라
function select(state) {
    return {
        visibleTodos: selectTodos(state.todos, state.visibilityFilter),
        visibilityFilter: state.visibilityFilter
    };
}

// 디스패치와 상태를 주입하려는 컴포넌트를 감싸줍니다
export default connect(select)(App);

/* connect() : Redux와 연결하고 싶은 컴포넌트를 react-redux의 connect()함수로 감싸준다
 가능한 최상위 컴포넌트나 라우트 핸들러만 이렇게 한다 기술적으로는 어떤 컴포넌트든지 redux스토어에 connect()할 수 있지만
 너무 깊이 연결하면 데이터 흐름을 추적하기가 어려워진다

 connect()호출로 감싸진 컴포넌트는 dispatch 함수를 prop으로 받게 되고 필요한 상태는 전역상태에서 가져오면 된다
 connect()의 유일한 인수는 selector라고 부를 함수 하나뿐이다
 이 함수는 전역 Redux스토어의 상태를 받아서 컴포넌트가 필요로 하는 props를 반환한다
 가장 간단하게 받은 state를 그대로 반환할수도 있겠지만 아마도 상태를 반환하기 전에 변환하고 싶을 것이다

 조합 가능한 셀렉터를 이용해 변환을 메모이즈 하고 싶다면 reselect를 알아보라.
 큰 앱에서 잘 작동할 것이다
 */
