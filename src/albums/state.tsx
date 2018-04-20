import {
  IState,
  Action,
  makeGetAlbumsDone,
  GET_ALBMS,
  IGetAlbumsAction,
  DON_ALBMS,
  makeGetAlbumsAction,
  SortBy,
} from './types';
import { call, put, takeEvery, all } from 'redux-saga/effects';
import { LocationChangeAction, LOCATION_CHANGE } from 'react-router-redux';
import { DataLoading, DataError, DataLoaded } from '../shared/types';
import { searchAlbums } from './api';
import { select, takeLatest } from 'redux-saga/effects';
import { IState as AppState } from '../store';

const initialState: IState = {
  albums: new DataLoading(),
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
    numberOfResults: 15,
  }
};

function* fetchAlbums(action: IGetAlbumsAction) {
  try {
    const prevReq = yield select((s: AppState) => s.albums.request),
      res = yield call(
        searchAlbums.bind(null, { ...prevReq, ...action.req })
      );
    yield put(makeGetAlbumsDone(res.result, res.count, null));
  } catch (e) {
    yield put(makeGetAlbumsDone(null, null, e));
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
        albums: new DataLoading(),
      };
    case DON_ALBMS:
      return !!action.error
        ? {
          ...state,
          count: action.count,
          albums: new DataError(action.error),
        }
        : !!action.albums
          ? {
            ...state,
            count: action.count,
            albums: new DataLoaded(action.albums),
          }
          : { ...state };
    default:
      return state;
  }
};

export { reducer, initialState, effects };
