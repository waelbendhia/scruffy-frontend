import { Band, Loadable } from '../shared';

interface SearchRequest {
  name: string;
  numberOfResults: number;
  page: number;
}

interface State {
  bands: Loadable<Band[]>;
  count: number;
  request: SearchRequest;
}

const GET_BNDS = '[Bands] Get bands';
const DON_BNDS = '[Bands] Get bands done';

interface GetBandsAction {
  type: '[Bands] Get bands';
  req: Partial<SearchRequest>;
}

const makeGetBandsAction =
  (req: Partial<SearchRequest>) => ({ type: GET_BNDS, req });

interface GetBandsDone {
  type: '[Bands] Get bands done';
  bands: Band[] | null;
  error: Error | null;
  count: number;
}

const makeGetBandsDone =
  (bands: Band[] | null, count: number | null, error: Error | null) =>
    ({
      type: DON_BNDS,
      bands,
      count,
      error,
    });

type Action = GetBandsAction | GetBandsDone;

export {
  SearchRequest,
  State,
  Action,
  GET_BNDS,
  GetBandsAction,
  makeGetBandsAction,
  DON_BNDS,
  makeGetBandsDone,
};
