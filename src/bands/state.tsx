import {
  State,
  Action,
  makeGetBandsDone,
  GET_BNDS,
  GetBandsAction,
  DON_BNDS,
  CHN_REQ,
  makeGetBandsAction,
} from './types';
import { call, put, takeEvery, all } from 'redux-saga/effects';
import { LocationChangeAction, LOCATION_CHANGE } from 'react-router-redux';
import { DataLoading, DataError, DataLoaded } from '../shared/types';
import { searchBands } from './api';

const initialState: State = {
  bands: new DataLoading(),
  count: 0,
  request: {
    page: 0,
    numberOfResults: 20,
    name: '',
  }
};

function* fetchBands(action: GetBandsAction) {
  try {
    const res = yield call(
      searchBands.bind(null, action.req)
    );
    yield put(makeGetBandsDone(res.result, res.count, null));
  } catch (e) {
    yield put(makeGetBandsDone(null, null, e));
  }
}

function* dispatchGetBands() {
  yield put(makeGetBandsAction(initialState.request));
}

function* effects() {
  yield all([
    takeEvery(GET_BNDS, fetchBands),
    takeEvery(
      (action: LocationChangeAction) =>
        action.type === LOCATION_CHANGE && action.payload.pathname === '/bands',
      dispatchGetBands,
    ),
  ]);
}

const reducer = (state = initialState, action: Action): State => {
  switch (action.type) {
    case GET_BNDS:
      return {
        ...state,
        bands: new DataLoading,
      };
    case DON_BNDS:
      return !!action.error
        ? {
          ...state,
          count: action.count,
          bands: new DataError(action.error),
        }
        : !!action.bands
          ? {
            ...state,
            count: action.count,
            bands: new DataLoaded(action.bands),
          }
          : { ...state };
    case CHN_REQ:
      return {
        ...state,
        request: {
          ...state.request,
          ...action.req,
        }
      };
    default:
      return state;
  }
};

export { reducer, initialState, effects };