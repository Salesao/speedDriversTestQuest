import { applyMiddleware, createStore } from 'redux';
import RootReducer from './rootReducer';
import createSagaMiddleware from '@redux-saga/core';
import { rootSaga } from './rootSaga';

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

if (__DEV__) {
	const createDebugger = require('redux-flipper').default;
	middleware.push(createDebugger());
}

export const store = createStore(RootReducer, applyMiddleware(...middleware));

sagaMiddleware.run(rootSaga);
