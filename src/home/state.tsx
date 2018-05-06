import {
  State,
  Action,
  GET_DATA,
  DON_DATA,
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

const initialState: State = Loading();

function* fetchData() {
  try {
    const influential = yield call(getInfluential),
      ratings = yield call(getDistribution),
      bandCount = yield call(getBandCount),
      albumCount = yield call(getAlbumCount);
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

const reducer = (state = initialState, action: Action): State => {
  switch (action.type) {
    case GET_DATA:
      return Loading();
    case DON_DATA:
      return action.payload;
    default:
      return state;
  }
};

export { reducer, initialState, effects };