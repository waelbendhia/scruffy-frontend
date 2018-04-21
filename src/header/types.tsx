import { IAlbum, IBand } from '../shared';

const TOGGLE_SEARCH = '[Header] Toggle search bar';
const SEARCH = '[Header] Search';
const SEARCH_RESULT = '[Header] Search result';

interface IToggleSearch {
  type: '[Header] Toggle search bar';
}

const makeToggleSearchAction = (): IToggleSearch => ({ type: TOGGLE_SEARCH });

interface ISearch {
  type: '[Header] Search';
  term: string;
}

const makeSearchAction = (term: string): ISearch =>
  ({ type: SEARCH, term });

interface ISearchResult {
  type: '[Header] Search result';
  bands: IBand[];
  albums: IAlbum[];
  error: Error | null;
}

const makeSearchResultAction =
  (bands?: IBand[], albums?: IAlbum[], error?: Error): ISearchResult =>
    ({
      type: SEARCH_RESULT,
      bands: bands || [],
      albums: albums || [],
      error: error || null,
    });

type Action
  = IToggleSearch
  | ISearch
  | ISearchResult;

interface IState {
  open: boolean;
  search: string;
  bands: IBand[];
  albums: IAlbum[];
}

export {
  Action,
  IToggleSearch,
  TOGGLE_SEARCH,
  makeToggleSearchAction,
  SEARCH,
  ISearch,
  makeSearchAction,
  SEARCH_RESULT,
  ISearchResult,
  makeSearchResultAction,
  IState,
};