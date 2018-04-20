import { Loadable, IAlbum } from '../shared';

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
  albums: Loadable<IAlbum[]>;
  count: number;
  request: ISearchRequest;
}

const GET_ALBMS = '[Albums] Get albums';
const DON_ALBMS = '[Albums] Get albums done';

interface IGetAlbumsAction {
  type: '[Albums] Get albums';
  req: Partial<ISearchRequest>;
}

const makeGetAlbumsAction =
  (req: Partial<ISearchRequest>) => ({ type: GET_ALBMS, req });

interface IGetAlbumsDone {
  type: '[Albums] Get albums done';
  albums: IAlbum[] | null;
  error: Error | null;
  count: number;
}

const makeGetAlbumsDone =
  (albums: IAlbum[] | null, count: number | null, error: Error | null) =>
    ({ type: DON_ALBMS, albums, count, error });

type Action = IGetAlbumsAction | IGetAlbumsDone;

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
  makeGetAlbumsDone,
};