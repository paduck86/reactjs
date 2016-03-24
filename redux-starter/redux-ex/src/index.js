import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './containers/App';
import todoApp from './reducers';

let store = createStore(todoApp);

let rootElement = document.getElementById('root');
React.render(
    // React 0.13의 이슈를 회피하기 위해 반드시 함수로 감싸준다
    <Provider store={store}>
        {() => <App />}
    </Provider>,
    rootElement
);
/* 이렇게 하면 안의 컴포넌트가 우리의 스토어 인스턴스를 사용할 수 있게 된다
   내부적으로 이는 React의 문서화되지 않은 context 기능에 의해 가능하지만
   API에 직접적으로 노출되지 않으니 걱정하지 안아도 된다.
 */