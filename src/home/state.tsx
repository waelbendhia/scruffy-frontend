import {
  State,
  Action,
  GET_DATA,
  makeGetDataAction,
  makeGetDataSuccess,
  makeGetDataFailed,
} from './types';
import { call, put, takeEvery, all } from 'redux-saga/effects';
import {
  getInfluential,
  getDistribution,
  getBandCount,
  getAlbumCount,
} from './api';
import { LOCATION_CHANGE, LocationChangeAction } from 'react-router-redux';
import { Loading } from '../shared/types';
import { nextState } from '../shared/types/actions';

const initialState: State = Loading();

function* fetchData() {
  try {
    const [influential, ratings, bandCount, albumCount] =
      yield Promise.all(
        [getInfluential, getDistribution, getBandCount, getAlbumCount]
          .map(call)
      );

    yield put(makeGetDataSuccess(
      { influential, ratings, bandCount, albumCount }
    ));
  } catch (e) {
    yield put(makeGetDataFailed(e));
  }
}

function* dispatchGetData() {
  yield put(makeGetDataAction());
}

function* effects() {
  yield all([
    takeEvery(GET_DATA, fetchData),
    takeEvery(
      (action: LocationChangeAction) =>
        action.type === LOCATION_CHANGE && action.payload.pathname === '/',
      dispatchGetData,
    ),
  ]);
}

const reducer = nextState<Action, State>(initialState, {
  '[Home] Get data': (_a, _s) => Loading(),
  '[Home] Get data done': (a, _) => a.payload,
});

export { reducer, initialState, effects };