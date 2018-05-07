import {
  IBand,
  makeFailableActionCreators,
  IResult,
  ILoadable,
} from '../shared';

interface ISearchRequest {
  name: string;
  numberOfResults: number;
  page: number;
}

interface IState {
  bands: ILoadable<IBand[]>;
  count: number;
  request: ISearchRequest;
  filtersOpen: boolean;
}

const GET_BNDS = '[Bands] Get bands';
const DON_BNDS = '[Bands] Get bands done';
const TOGGLE_FILTERS = '[Bands] Toggle filters';

interface IToggleFilters {
  type: '[Bands] Toggle filters';
}

const makeToggleFiltersAction = () => ({ type: TOGGLE_FILTERS });

interface IGetBandsAction {
  type: '[Bands] Get bands';
  payload: Partial<ISearchRequest>;
}

const makeGetBandsAction = (payload: Partial<ISearchRequest>) =>
  ({ type: GET_BNDS, payload });

interface IGetBandsPayload {
  bands: IBand[];
  count: number;
}

interface IGetBandsDone {
  type: '[Bands] Get bands done';
  payload: IResult<IGetBandsPayload>;
}

const [makeGetBandsSuccess, makeGetBandsFailed] =
  makeFailableActionCreators(DON_BNDS);

type Action
  = IGetBandsAction
  | IGetBandsDone
  | IToggleFilters;

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
  TOGGLE_FILTERS,
  IToggleFilters,
  makeToggleFiltersAction,
};
