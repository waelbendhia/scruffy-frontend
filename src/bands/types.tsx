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
const CHN_REQ = '[Bands] Change request';

interface GetBandsAction {
  type: '[Bands] Get bands';
  req: SearchRequest;
}

const makeGetBandsAction = (req: SearchRequest) => ({ type: GET_BNDS, req });

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
    });

interface ChangeRequest {
  type: '[Bands] Change request';
  req: {
    name?: string;
    numberOfResults?: number;
    page?: number;
  };
}

const makeChangeRequest =
  (
    name: string | undefined,
    numberOfResults: number | undefined,
    page: number | undefined,
  ): ChangeRequest =>
    ({
      type: CHN_REQ,
      req: { name, numberOfResults, page }
    });

type Action = ChangeRequest | GetBandsAction | GetBandsDone;

export {
  SearchRequest,
  State,
  Action,
  GET_BNDS,
  GetBandsAction,
  makeGetBandsAction,
  DON_BNDS,
  CHN_REQ,
  makeChangeRequest,
  makeGetBandsDone,
};
