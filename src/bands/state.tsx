import {
  IState,
  Action,
  GET_BNDS,
  GetBandsAction,
  makeGetBandsAction,
  makeGetBandsSuccess,
  makeGetBandsFailed,
} from './types';
import { call, put, takeEvery, all } from 'redux-saga/effects';
import { LocationChangeAction, LOCATION_CHANGE } from 'react-router-redux';
import { Loading } from '../shared/types';
import { searchBands } from './api';
import { select, takeLatest } from 'redux-saga/effects';
import { IState as AppState } from '../store';
import { nextState } from '../shared/types/actions';

const initialState: IState = {
  bands: Loading(),
  count: 0,
  request: {
    page: 0,
    numberOfResults: 10,
    name: '',
  },
  filtersOpen: false,
};

function* fetchBands(action: GetBandsAction) {
  try {
    const prevReq = yield select((s: AppState) => s.bands.request);
    const res = yield call(
      () => searchBands({ ...prevReq, ...action.payload })
    );
    yield put(makeGetBandsSuccess({ bands: res.result, count: res.count }));
  } catch (e) {
    yield put(makeGetBandsFailed(e));
  }
}

function* dispatchGetBands() {
  const prevReq = yield select((s: AppState) => s.bands.request);
  yield put(makeGetBandsAction(prevReq));
}

function* effects() {
  yield all([
    takeLatest(GET_BNDS, fetchBands),
    takeEvery(
      (action: LocationChangeAction) =>
        action.type === LOCATION_CHANGE && action.payload.pathname === '/bands',
      dispatchGetBands,
    ),
  ]);
}

const reducer = nextState<Action, IState>(initialState, {
  '[Bands] Get bands': (a, s) => ({
    ...s,
    request: { ...s.request, ...a.payload },
    bands: Loading(),
  }),
  '[Bands] Get bands done': (a, s) => ({
    ...s,
    count: a.payload.map(x => x.count).withDefault(0),
    bands: a.payload.map(x => x.bands),
  }),
  '[Bands] Toggle filters': (_, s) => ({ ...s, filtersOpen: !s.filtersOpen }),
});

export { reducer, initialState, effects };