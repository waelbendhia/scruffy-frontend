import {
  ILoadable,
  IAlbum,
  IAction,
  actionCreator,
  IActionFailable,
  failableActionCreator,
  IActionNoPayload,
  noPayloadActionCreator
} from '../shared';

enum SortBy {
  RATING = 'rating',
  DATE = 'date',
  ALBUM_NAME = 'albumName',
  BAND_NAME = 'bandName',
}

interface ISearchRequest {
  ratingLower: number;
  ratingHigher: number;
  yearLower: number;
  yearHigher: number;
  includeUnknown: boolean;
  name: string;
  sortBy: SortBy;
  sortOrderAsc: boolean;
  page: number;
  numberOfResults: number;
}

interface IState {
  albums: ILoadable<IAlbum[]>;
  count: number;
  request: ISearchRequest;
  filtersOpen: boolean;
}

const GET_ALBMS = '[Albums] Get albums';
const DON_ALBMS = '[Albums] Get albums done';
const TOGGLE_FILTERS = '[Albums] Toggle filters';

type GetAlbumsAction = IAction<typeof GET_ALBMS, Partial<ISearchRequest>>;

const makeGetAlbumsAction = actionCreator<GetAlbumsAction>(GET_ALBMS);

interface IGetAlbumsPayload {
  albums: IAlbum[];
  count: number;
}

type GetAlbumsDone = IActionFailable<typeof DON_ALBMS, IGetAlbumsPayload>;

const [makeGetAlbumsSuccess, makeGetAlbumsFailed] =
  failableActionCreator<GetAlbumsDone>(DON_ALBMS);

type ToggleFilters = IActionNoPayload<typeof TOGGLE_FILTERS>;
const makeToggleFiltersAction =
  noPayloadActionCreator<ToggleFilters>(TOGGLE_FILTERS);

type Action = GetAlbumsAction | GetAlbumsDone | ToggleFilters;

export {
  SortBy,
  ISearchRequest,
  IState,
  Action,
  GET_ALBMS,
  GetAlbumsAction,
  makeGetAlbumsAction,
  DON_ALBMS,
  GetAlbumsDone,
  makeGetAlbumsSuccess,
  makeGetAlbumsFailed,
  TOGGLE_FILTERS,
  ToggleFilters,
  makeToggleFiltersAction,
};