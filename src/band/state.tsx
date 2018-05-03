import {
  State,
  Action,
  makeGetBandSuccess,
  makeGetBandFailed,
  GET_BND,
  IGetBandAction,
  DON_BND,
  makeGetBandAction,
} from './types';
import { call, put, takeEvery, all } from 'redux-saga/effects';
import { LocationChangeAction, LOCATION_CHANGE } from 'react-router-redux';
import { Loading } from '../shared/types';
import { getBand } from './api';
import { takeLatest } from 'redux-saga/effects';
import { history } from '../store';

const initialState: State = Loading();

function* fetchBand(action: IGetBandAction) {
  try {
    const res = (yield call(getBand.bind(null, action.req)));
    yield put(makeGetBandSuccess(res));
  } catch (e) {
    yield put(makeGetBandFailed(e));
  }
}

function* dispatchGetBand() {
  yield put(makeGetBandAction(history.location.pathname));
}

function* effects() {
  yield all([
    takeLatest(GET_BND, fetchBand),
    takeEvery(
      (action: LocationChangeAction) =>
        action.type === LOCATION_CHANGE &&
        action.payload.pathname.indexOf('/bands') !== -1 &&
        action.payload.pathname.split('/').length === 4,
      dispatchGetBand,
    ),
  ]);
}

const reducer = (state = initialState, action: Action): State => {
  switch (action.type) {
    case GET_BND:
      return Loading();
    case DON_BND:
      return action.payload;
    default:
      return state;
  }
};

export { reducer, initialState, effects };