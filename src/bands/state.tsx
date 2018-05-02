import {
  IState,
  Action,
  GET_BNDS,
  IGetBandsAction,
  DON_BNDS,
  makeGetBandsAction,
  makeGetBandsSuccess,
  makeGetBandsFailed,
} from './types';
import { call, put, takeEvery, all } from 'redux-saga/effects';
import { LocationChangeAction, LOCATION_CHANGE } from 'react-router-redux';
import { Loading, mapFailable, Ok, Err } from '../shared/types';
import { searchBands } from './api';
import { select, takeLatest } from 'redux-saga/effects';
import { IState as AppState } from '../store';

const initialState: IState = {
  bands: new Loading(),
  count: 0,
  request: {
    page: 0,
    numberOfResults: 10,
    name: '',
  }
};

function* fetchBands(action: IGetBandsAction) {
  try {
    const prevReq = yield select((s: AppState) => s.bands.request),
      res = yield call(
        searchBands.bind(null, { ...prevReq, ...action.req })
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

const reducer = (state = initialState, action: Action): IState => {
  switch (action.type) {
    case GET_BNDS:
      return {
        ...state,
        request: { ...state.request, ...action.req },
        bands: new Loading(),
      };
    case DON_BNDS:
      return {
        ...state,
        count: mapFailable(action.payload, x => x.count, 0),
        bands: mapFailable(
          action.payload,
          x => new Ok(x.bands),
          e => new Err(e)
        ),
      };
    default:
      return state;
  }
};

export { reducer, initialState, effects };