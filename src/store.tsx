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

import {
  initialState as bandInitialState,
  reducer as bandReducer,
  effects as bandEffects,
  State as BandState,
} from './band';

const sagaMiddleware = createSagaMiddleware(),
  history = createHistory();

interface State {
  router: RouterState;
  home: HomeState;
  bands: BandsState;
  albums: AlbumsState;
  band: BandState;
}

const initialState: State = {
  router: { location: null },
  home: homeInitialState,
  bands: bandsInitialState,
  albums: albumsInitialState,
  band: bandInitialState,
};

const store: Store<State> = createStore(
  combineReducers({
    bands: bandsReducer,
    router: routerReducer,
    home: homeReducer,
    albums: albumsReducer,
    band: bandReducer,
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
sagaMiddleware.run(bandEffects);

export default store;
export { State, history };