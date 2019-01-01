import {
  IBand,
  ILoadable,
  IAction,
  IActionFailable,
  IActionNoPayload,
  noPayloadActionCreator,
  actionCreator,
  failableActionCreator,
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

type ToggleFilters = IActionNoPayload<typeof TOGGLE_FILTERS>;
const makeToggleFiltersAction =
  noPayloadActionCreator<ToggleFilters>(TOGGLE_FILTERS);

type GetBandsAction = IAction<typeof GET_BNDS, Partial<ISearchRequest>>;
const makeGetBandsAction = actionCreator<GetBandsAction>(GET_BNDS);

interface IGetBandsPayload {
  bands: IBand[];
  count: number;
}

type GetBandsDone = IActionFailable<typeof DON_BNDS, IGetBandsPayload>;

const [makeGetBandsSuccess, makeGetBandsFailed] =
  failableActionCreator<GetBandsDone>(DON_BNDS);

type Action = GetBandsAction | GetBandsDone | ToggleFilters;

export {
  ISearchRequest,
  IState,
  Action,
  GET_BNDS,
  GetBandsAction,
  makeGetBandsAction,
  DON_BNDS,
  makeGetBandsSuccess,
  makeGetBandsFailed,
  TOGGLE_FILTERS,
  ToggleFilters,
  makeToggleFiltersAction,
};
