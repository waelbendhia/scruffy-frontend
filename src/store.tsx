import { createStore, applyMiddleware, combineReducers } from 'redux';
import {
  RouterState, routerMiddleware, routerReducer,
} from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import { Store } from 'react-redux';
import createSagaMiddleware from 'redux-saga';

import {
  initialState as homeInitialState,
  State as HomeState,
  reducer as homeReducer,
  effects as homeEffects,
} from './home';

import {
  initialState as bandsInitialState,
  reducer as bandsReducer,
  effects as bandsEffects,
  State as BandsState,
} from './bands';

const sagaMiddleware = createSagaMiddleware(),
  history = createHistory();

interface State {
  router: RouterState;
  home: HomeState;
  bands: BandsState;
}

const initialState: State = {
  router: { location: null },
  home: homeInitialState,
  bands: bandsInitialState,
};

const store: Store<State> = createStore(
  combineReducers({
    bands: bandsReducer,
    router: routerReducer,
    home: homeReducer,
  }),
  initialState,
  applyMiddleware(
    routerMiddleware(history),
    sagaMiddleware,
  ),
);

sagaMiddleware.run(homeEffects);
sagaMiddleware.run(bandsEffects);

export default store;
export { State, history };