import { Loadable, Album } from '../shared';

enum SortBy {
  RATING = 'rating',
  DATE = 'date',
  ALBUM_NAME = 'albumName',
  BAND_NAME = 'bandName',
}

interface SearchRequest {
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

interface State {
  albums: Loadable<Album[]>;
  count: number;
  request: SearchRequest;
}

const GET_ALBMS = '[Albums] Get albums';
const DON_ALBMS = '[Albums] Get albums done';

interface GetAlbumsAction {
  type: '[Albums] Get albums';
  req: Partial<SearchRequest>;
}

const makeGetAlbumsAction =
  (req: Partial<SearchRequest>) => ({ type: GET_ALBMS, req });

interface GetAlbumsDone {
  type: '[Albums] Get albums done';
  albums: Album[] | null;
  error: Error | null;
  count: number;
}

const makeGetAlbumsDone =
  (albums: Album[] | null, count: number | null, error: Error | null) =>
    ({
      type: DON_ALBMS,
      albums,
      count,
      error,
    });

type Action = GetAlbumsAction | GetAlbumsDone;

export {
  SortBy,
  SearchRequest,
  State,
  Action,
  GET_ALBMS,
  GetAlbumsAction,
  makeGetAlbumsAction,
  DON_ALBMS,
  GetAlbumsDone,
  makeGetAlbumsDone,
};