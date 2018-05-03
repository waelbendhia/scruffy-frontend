import {
  IState,
  Action,
  GET_ALBMS,
  IGetAlbumsAction,
  DON_ALBMS,
  makeGetAlbumsAction,
  SortBy,
  makeGetAlbumsSuccess,
  makeGetAlbumsFailed,
} from './types';
import { call, put, takeEvery, all } from 'redux-saga/effects';
import { LocationChangeAction, LOCATION_CHANGE } from 'react-router-redux';
import { Loading } from '../shared/types';
import { searchAlbums } from './api';
import { select, takeLatest } from 'redux-saga/effects';
import { IState as AppState } from '../store';

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
  }
};

function* fetchAlbums(action: IGetAlbumsAction) {
  try {
    const prevReq = yield select((s: AppState) => s.albums.request),
      res = yield call(
        searchAlbums.bind(null, { ...prevReq, ...action.req })
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

const reducer = (state = initialState, action: Action): IState => {
  switch (action.type) {
    case GET_ALBMS:
      return {
        ...state,
        request: { ...state.request, ...action.req },
        albums: Loading(),
      };
    case DON_ALBMS:
      return {
        ...state,
        count: action.payload.map(d => d.count).withDefault(0),
        albums: action.payload.map(d => d.albums),
      };
    default:
      return state;
  }
};

export { reducer, initialState, effects };
