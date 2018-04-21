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
import { IState as BandsState } from './bands/types';

import {
  initialState as albumsInitialState,
  reducer as albumsReducer,
  effects as albumsEffects,
  IState as AlbumsState,
} from './albums';

import {
  initialState as bandInitialState,
  reducer as bandReducer,
  effects as bandEffects,
  State as BandState,
} from './band';

import {
  IState as HeaderState,
} from './header/types';
import {
  initialState as headerInitialState,
  reducer as headerReducer,
  effects as headerEffects,
} from './header/state';

const sagaMiddleware = createSagaMiddleware(),
  history = createHistory();

interface IState {
  router: RouterState;
  home: HomeState;
  bands: BandsState;
  albums: AlbumsState;
  band: BandState;
  header: HeaderState;
}

const initialState: IState = {
  router: { location: null },
  home: homeInitialState,
  bands: bandsInitialState,
  albums: albumsInitialState,
  band: bandInitialState,
  header: headerInitialState,
};

console.log('Header reducer', headerReducer, headerInitialState);

const store: Store<IState> = createStore(
  combineReducers({
    bands: bandsReducer,
    router: routerReducer,
    home: homeReducer,
    albums: albumsReducer,
    band: bandReducer,
    header: headerReducer,
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
sagaMiddleware.run(headerEffects);

export default store;
export { IState, history, initialState };