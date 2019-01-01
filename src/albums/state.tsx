import {
  IState,
  Action,
  GET_ALBMS,
  GetAlbumsAction,
  makeGetAlbumsAction,
  SortBy,
  makeGetAlbumsSuccess,
  makeGetAlbumsFailed,
} from './types';
import { call, put, takeEvery, all } from 'redux-saga/effects';
import { LocationChangeAction, LOCATION_CHANGE } from 'react-router-redux';
import { Loading, IAlbum } from '../shared/types';
import { searchAlbums, ISearchResult } from './api';
import { select, takeLatest } from 'redux-saga/effects';
import { IState as AppState } from '../store';
import { ISearchRequest } from '../bands/types';
import { nextState } from '../shared/types/actions';

const initialState: IState = {
  albums: Loading(),
  count: 0,
  request: {
    ratingLower: 0,
    ratingHigher: 10,
    yearLower: 0,
    yearHigher: new Date().getFullYear(),
    includeUnknown: true,
    name: '',
    sortBy: SortBy.RATING,
    sortOrderAsc: false,
    page: 0,
    numberOfResults: 10,
  },
  filtersOpen: false,
};

function* fetchAlbums(action: GetAlbumsAction) {
  try {
    const prevReq: ISearchRequest = yield select(
      (s: AppState) => s.albums.request
    );
    const res: ISearchResult = yield call(
      searchAlbums,
      { ...prevReq, ...action.payload },
    );
    yield put(makeGetAlbumsSuccess({ albums: res.result, count: res.count }));
  } catch (e) {
    yield put(makeGetAlbumsFailed(e));
  }
}

function* dispatchGetAlbums() {
  yield put(makeGetAlbumsAction(initialState.request));
}

function* effects() {
  yield all([
    takeLatest(GET_ALBMS, fetchAlbums),
    takeEvery(
      (action: LocationChangeAction) =>
        action.type === LOCATION_CHANGE &&
        action.payload.pathname === '/albums',
      dispatchGetAlbums,
    ),
  ]);
}

const reducer = nextState<Action, IState>(initialState, {
  '[Albums] Get albums': (a, s) => ({
    ...s,
    request: { ...s.request, ...a.payload },
    albums: Loading<IAlbum[]>(),
  }),
  '[Albums] Get albums done': (a, s) => ({
    ...s,
    count: a.payload.map(d => d.count).withDefault(0),
    albums: a.payload.map(d => d.albums),
  }),
  '[Albums] Toggle filters': (a, s) => ({ ...s, filtersOpen: !s.filtersOpen }),
});

export { reducer, initialState, effects };
