import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import usersReducer from './reducers/users'

const loggerMiddleware = createLogger();

export default function configureStore() {
    return createStore(
        usersReducer,
        applyMiddleware(
            thunkMiddleware,
            loggerMiddleware
        )
    );
}
