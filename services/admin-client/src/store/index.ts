/* eslint-disable no-underscore-dangle */
import { AnyAction, applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk, { ThunkDispatch } from 'redux-thunk';

import initialState, { RootState } from './rootState';
import rootReducer from './rootReducer';

const middlewares = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;

export type GenericDispatch = ThunkDispatch<RootState, undefined, AnyAction>;
