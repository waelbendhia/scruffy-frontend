import {
  State,
  Action,
  GET_RAT, DON_RAT,
  GET_INF, DON_INF,
  GET_CNT, DON_CNT,
  GetInfluentialDone,
  GetRatingDone,
  GetCountDone,
  BandWithInfluence,
} from './types';
import { Loadable } from '../shared';
import { call, put, takeEvery, all } from 'redux-saga/effects';
import { getInfluential, getDistribution, getCount } from './api';
import { LOCATION_CHANGE, LocationChangeAction } from 'react-router-redux';

const initialState: State = {
  ratings: new Loadable([], false, null),
  influential: new Loadable([], false, null),
  count: new Loadable(0, false, null),
};

function* fetchInfluential() {
  try {
    const bands: BandWithInfluence[] = yield call(getInfluential);
    yield put(
      new GetInfluentialDone(
        bands.sort((a, b) => b.influence - a.influence),
        null,
      )
    );
  } catch (e) {
    yield put(new GetInfluentialDone(null, e));
  }
}

function* fetchRatings() {
  try {
    const ratings = yield call(getDistribution);
    yield put(new GetRatingDone(ratings, null));
  } catch (e) {
    yield put(new GetRatingDone(null, e));
  }
}

function* fetchCount() {
  try {
    const count = yield call(getCount);
    yield put(new GetCountDone(count, null));
  } catch (e) {
    yield put(new GetCountDone(null, e));
  }
}

function* effects() {
  yield all([
    takeEvery(GET_INF, fetchInfluential),
    takeEvery(GET_RAT, fetchRatings),
    takeEvery(GET_CNT, fetchCount),
    takeEvery(
      (action: LocationChangeAction) =>
        action.type === LOCATION_CHANGE && action.payload.pathname === '/',
      fetchInfluential,
    ),
    takeEvery(
      (action: LocationChangeAction) =>
        action.type === LOCATION_CHANGE && action.payload.pathname === '/',
      fetchCount,
    ),
    takeEvery(
      (action: LocationChangeAction) =>
        action.type === LOCATION_CHANGE && action.payload.pathname === '/',
      fetchRatings,
    ),
  ]);
}

const reducer = (state = initialState, action: Action): State => {
  console.log(action);
  switch (action.type) {
    case GET_RAT:
      return {
        ...state,
        ratings: {
          ...state.ratings,
          loading: true,
        }
      };
    case DON_RAT:
      return {
        ...state,
        ratings: {
          data: action.ratings || [],
          loading: false,
          error: action.error,
        }
      };
    case GET_INF:
      return {
        ...state,
        influential: {
          ...state.influential,
          loading: true,
        }
      };
    case DON_INF:
      return {
        ...state,
        influential: {
          data: action.bands || [],
          loading: false,
          error: action.error,
        }
      };
    case GET_CNT:
      return {
        ...state,
        count: {
          ...state.count,
          loading: true,
        }
      };
    case DON_CNT:
      return {
        ...state,
        count: {
          data: action.count || 0,
          loading: false,
          error: action.error,
        }
      };
    default:
      return state;
  }
};

export { reducer, initialState, effects };