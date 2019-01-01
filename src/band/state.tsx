import {
  State,
  Action,
  makeGetBandSuccess,
  makeGetBandFailed,
  GET_BND,
  GetBandAction,
  makeGetBandAction,
  GetBandDone,
} from './types';
import { call, put, takeEvery, all } from 'redux-saga/effects';
import { LocationChangeAction, LOCATION_CHANGE } from 'react-router-redux';
import { Loading, IBand } from '../shared/types';
import { getBand } from './api';
import { takeLatest } from 'redux-saga/effects';
import { history } from '../store';
import { nextState } from '../shared/types/actions';

const initialState: State = Loading();

function* fetchBand(action: GetBandAction) {
  try {
    const res = (yield call(() => getBand(action.payload)));
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

const reducer = nextState<Action, State>(initialState, {
  '[Band] Get band done': (a: GetBandDone, _: State) => a.payload,
  '[Band] Get band': (_a: GetBandAction, _s: State) => Loading<IBand>(),
});

export { reducer, initialState, effects };