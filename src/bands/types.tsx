import { IBand, Loadable } from '../shared';

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

interface IGetBandsDone {
  type: '[Bands] Get bands done';
  bands: IBand[] | null;
  error: Error | null;
  count: number;
}

const makeGetBandsDone =
  (bands: IBand[] | null, count: number | null, error: Error | null) =>
    ({
      type: DON_BNDS,
      bands,
      count,
      error,
    });

type Action = IGetBandsAction | IGetBandsDone;

export {
  ISearchRequest,
  IState,
  Action,
  GET_BNDS,
  IGetBandsAction,
  makeGetBandsAction,
  DON_BNDS,
  makeGetBandsDone,
};
