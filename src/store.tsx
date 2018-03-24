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
} from './bands/state';
import { State as BandsState } from './bands/types';

import {
  initialState as albumsInitialState,
  reducer as albumsReducer,
  effects as albumsEffects,
  State as AlbumsState,
} from './albums';

const sagaMiddleware = createSagaMiddleware(),
  history = createHistory();

interface State {
  router: RouterState;
  home: HomeState;
  bands: BandsState;
  albums: AlbumsState;
}

const initialState: State = {
  router: { location: null },
  home: homeInitialState,
  bands: bandsInitialState,
  albums: albumsInitialState,
};

const store: Store<State> = createStore(
  combineReducers({
    bands: bandsReducer,
    router: routerReducer,
    home: homeReducer,
    albums: albumsReducer,
  }),
  initialState,
  applyMiddleware(
    routerMiddleware(history),
    sagaMiddleware,
  ),
);

sagaMiddleware.run(homeEffects);
sagaMiddleware.run(bandsEffects);
sagaMiddleware.run(albumsEffects);

export default store;
export { State, history };