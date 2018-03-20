
import { createStore, applyMiddleware, combineReducers } from 'redux';
import {
  RouterState, routerMiddleware, routerReducer,
} from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import { Store } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import * as Home from './home';
const sagaMiddleware = createSagaMiddleware(),
  history = createHistory();

interface State {
  router: RouterState;
  home: Home.State;
}

const initialState: State = {
  router: { location: null },
  home: Home.initialState,
};

const store: Store<State> = createStore(
  combineReducers({
    router: routerReducer,
    home: Home.reducer,
  }),
  initialState,
  applyMiddleware(
    routerMiddleware(history),
    sagaMiddleware,
  ),
);

sagaMiddleware.run(Home.effects);

export default store;
export { State, history };