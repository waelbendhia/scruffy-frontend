import {
  IState,
  Action,
  GET_BNDS,
  IGetBandsAction,
  DON_BNDS,
  makeGetBandsAction,
  makeGetBandsSuccess,
  makeGetBandsFailed,
  TOGGLE_FILTERS,
} from './types';
import { call, put, takeEvery, all } from 'redux-saga/effects';
import { LocationChangeAction, LOCATION_CHANGE } from 'react-router-redux';
import { Loading } from '../shared/types';
import { searchBands } from './api';
import { select, takeLatest } from 'redux-saga/effects';
import { IState as AppState } from '../store';

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

function* fetchBands(action: IGetBandsAction) {
  try {
    const prevReq = yield select((s: AppState) => s.bands.request);
    const res = yield call(
      searchBands.bind(null, { ...prevReq, ...action.payload })
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
        request: { ...state.request, ...action.payload },
        bands: Loading(),
      };
    case DON_BNDS:
      return {
        ...state,
        count: action.payload.map(x => x.count).withDefault(0),
        bands: action.payload.map(x => x.bands),
      };
    case TOGGLE_FILTERS:
      return { ...state, filtersOpen: !state.filtersOpen };
    default:
      return state;
  }
};

export { reducer, initialState, effects };