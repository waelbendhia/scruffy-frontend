import {
  ILoadable,
  IAlbum,
  IResult,
  makeFailableActionCreators,
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
}

const GET_ALBMS = '[Albums] Get albums';
const DON_ALBMS = '[Albums] Get albums done';

interface IGetAlbumsAction {
  type: '[Albums] Get albums';
  payload: Partial<ISearchRequest>;
}

const makeGetAlbumsAction =
  (payload: Partial<ISearchRequest>) => ({ type: GET_ALBMS, payload });

interface IGetAlbumsPayload {
  albums: IAlbum[];
  count: number;
}

interface IGetAlbumsDone {
  type: '[Albums] Get albums done';
  payload: IResult<IGetAlbumsPayload>;
}

const [makeGetAlbumsSuccess, makeGetAlbumsFailed] =
  makeFailableActionCreators(DON_ALBMS);

type Action
  = IGetAlbumsAction
  | IGetAlbumsDone;

export {
  SortBy,
  ISearchRequest,
  IState,
  Action,
  GET_ALBMS,
  IGetAlbumsAction,
  makeGetAlbumsAction,
  DON_ALBMS,
  IGetAlbumsDone,
  makeGetAlbumsSuccess,
  makeGetAlbumsFailed,
};