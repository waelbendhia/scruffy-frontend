import {
  IBand,
  Loadable,
  Failable,
  makeFailableActionCreators,
} from '../shared';

interface ISearchRequest {
  name: string;
  numberOfResults: number;
  page: number;
}

interface IState {
  bands: Loadable<IBand[]>;
  count: number;
  request: ISearchRequest;
}

const GET_BNDS = '[Bands] Get bands';
const DON_BNDS = '[Bands] Get bands done';

interface IGetBandsAction {
  type: '[Bands] Get bands';
  req: Partial<ISearchRequest>;
}

const makeGetBandsAction =
  (req: Partial<ISearchRequest>) => ({ type: GET_BNDS, req });

interface IGetBandsPayload {
  bands: IBand[];
  count: number;
}

interface IGetBandsDone {
  type: '[Bands] Get bands done';
  payload: Failable<IGetBandsPayload>;
}

const [makeGetBandsSuccess, makeGetBandsFailed] =
  makeFailableActionCreators<IGetBandsPayload>(DON_BNDS);

type Action = IGetBandsAction | IGetBandsDone;

export {
  ISearchRequest,
  IState,
  Action,
  GET_BNDS,
  IGetBandsAction,
  makeGetBandsAction,
  DON_BNDS,
  makeGetBandsSuccess,
  makeGetBandsFailed,
};
