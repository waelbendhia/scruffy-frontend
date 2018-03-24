import { Loadable, Album } from '../shared';

enum SortBy {
  SORT_BY_RATING = 0,
  SORT_BY_DATE = 1,
  SORT_BY_ALBUM_NAME = 2,
  SORT_BY_BANDNAME = 3,
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