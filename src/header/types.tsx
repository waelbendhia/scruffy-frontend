import { IAlbum, IBand } from '../shared';

const TOGGLE_SEARCH = '[Header] Toggle search bar';
const TOGGLE_MENU = '[Header] Toggle menu';
const SEARCH = '[Header] Search';
const SEARCH_RESULT = '[Header] Search result';

interface IToggleSearch {
  type: '[Header] Toggle search bar';
}

const makeToggleSearchAction = (): IToggleSearch => ({ type: TOGGLE_SEARCH });

interface IToggleMenu {
  type: '[Header] Toggle menu';
}

const makeToggleMenuAction = (): IToggleMenu => ({ type: TOGGLE_MENU });

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
  | IToggleMenu
  | ISearch
  | ISearchResult;

interface IState {
  menuOpen: boolean;
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
  IToggleMenu,
  TOGGLE_MENU,
  makeToggleMenuAction,
  SEARCH,
  ISearch,
  makeSearchAction,
  SEARCH_RESULT,
  ISearchResult,
  makeSearchResultAction,
  IState,
};