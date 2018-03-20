import { Band, Loadable } from '../shared';
import { Middleware, MiddlewareAPI } from 'redux';
import { Dispatch } from 'react-redux';

interface BandWithInfluence extends Band {
  influence: number;
}

interface State {
  ratings: Loadable<number[]>;
  influential: Loadable<BandWithInfluence[]>;
  count: Loadable<number>;
}

const GET_RAT = '[Home] Get ratings distribution';
const DON_RAT = '[Home] Get ratings distribution done';
const GET_INF = '[Home] Get most influential bands';
const DON_INF = '[Home] Get most influential bands done';
const GET_CNT = '[Home] Get band count';
const DON_CNT = '[Home] Get band count done';

class GetRatingAction {
  readonly type = GET_RAT;
}

class GetRatingDone {
  readonly type = DON_RAT;
  constructor(
    public ratings: number[] | null,
    public error: string | null,
  ) { }
}

class GetInfluentialAction {
  readonly type = GET_INF;
}

class GetInfluentialDone {
  readonly type = DON_INF;
  constructor(
    public bands: BandWithInfluence[] | null,
    public error: string | null,
  ) { }
}

class GetCountAction {
  readonly type = GET_CNT;
}

class GetCountDone {
  readonly type = DON_CNT;
  constructor(
    public count: number | null,
    public error: string | null,
  ) { }
}

type Action =
  GetRatingAction |
  GetRatingDone |
  GetInfluentialAction |
  GetInfluentialDone |
  GetCountAction |
  GetCountDone;

const toPlainObjectMiddleware: Middleware =
  (_: MiddlewareAPI<void>) =>
    (next: Dispatch<void>) =>
      <A extends Action>(action: A) => {
        if (
          action instanceof GetCountAction ||
          action instanceof GetInfluentialAction ||
          action instanceof GetRatingAction
        ) {
          action = { type: action.type } as A;
        }
        if (action instanceof GetRatingDone) {
          action = {
            type: action.type,
            ratings: action.ratings,
            error: action.error,
          } as A;
        }
        if (action instanceof GetInfluentialDone) {
          action = {
            type: action.type,
            bands: action.bands,
            error: action.error,
          } as A;
        }
        if (action instanceof GetCountDone) {
          action = {
            type: action.type,
            count: action.count,
            error: action.error,
          } as A;
        }
        return next(action);
      };

export {
  BandWithInfluence,
  State,
  GET_RAT, DON_RAT,
  GET_INF, DON_INF,
  GET_CNT, DON_CNT,
  GetRatingAction,
  GetRatingDone,
  GetInfluentialAction,
  GetInfluentialDone,
  GetCountAction,
  GetCountDone,
  Action,
  toPlainObjectMiddleware,
};