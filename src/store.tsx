import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import {
  RouterState, routerMiddleware, routerReducer,
} from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import createSagaMiddleware from 'redux-saga';

import {
  homeInitialState,
  HomeState,
  homeReducer,
  homeEffects,
} from './home';

import {
  BandsState,
  bandsInitialState,
  bandsReducer,
  bandsEffects,
} from './bands';

import {
  albumsInitialState,
  albumsReducer,
  albumsEffects,
  AlbumsState,
} from './albums';

import {
  bandInitialState,
  bandReducer,
  bandEffects,
  BandState,
} from './band';

import {
  initialState as headerInitialState,
  reducer as headerReducer,
  effects as headerEffects,
} from './header/state';
import { IState as HeaderState } from './header/types';

const sagaMiddleware = createSagaMiddleware();
const history = createHistory();

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

const composeEnhancers =
  // @ts-ignore
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  || compose;

const store = createStore<IState>(
  combineReducers({
    bands: bandsReducer,
    router: routerReducer,
    home: homeReducer,
    albums: albumsReducer,
    band: bandReducer,
    header: headerReducer,
  }),
  initialState,
  composeEnhancers(applyMiddleware(
    routerMiddleware(history),
    sagaMiddleware,
  )),
);

sagaMiddleware.run(homeEffects);
sagaMiddleware.run(bandsEffects);
sagaMiddleware.run(albumsEffects);
sagaMiddleware.run(bandEffects);
sagaMiddleware.run(headerEffects);

export default store;
export { IState, history, initialState };