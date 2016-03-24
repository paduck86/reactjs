import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import Root from './containers/Root';
import '../../styles/styles.less';

ReactDOM.render(
  <Root />,
  document.getElementById('root')
);
