import {
  State,
  Action,
  GET_DATA, DON_DATA,
  BandWithInfluence,
  makeGetDataDone,
  makeGetDataAction,
} from './types';
import { } from '../shared';
import { call, put, takeEvery, all } from 'redux-saga/effects';
import {
  getInfluential,
  getDistribution,
  getBandCount,
  getAlbumCount,
} from './api';
import { LOCATION_CHANGE, LocationChangeAction } from 'react-router-redux';
import { Loading, LoadedData, Err } from '../shared/types';

const initialState: State = new Loading();

function* fetchData() {
  try {
    const influential: BandWithInfluence[] = yield call(getInfluential),
      ratings = yield call(getDistribution),
      bandCount = yield call(getBandCount),
      albumCount = yield call(getAlbumCount);
    yield put(makeGetDataDone(
      { influential, ratings, bandCount, albumCount },
      null,
    ));
  } catch (e) {
    yield put(makeGetDataDone(null, e));
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
  console.log(action);
  switch (action.type) {
    case GET_DATA:
      return new Loading();
    case DON_DATA:
      return !!action.error
        ? new Err(action.error)
        : !!action.data
          ? new LoadedData(action.data)
          : state;
    default:
      return state;
  }
};

export { reducer, initialState, effects };