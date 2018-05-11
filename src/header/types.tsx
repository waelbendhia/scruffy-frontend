import { IAlbum, IBand, IResult, makeFailableActionCreators } from '../shared';

const TOGGLE_SEARCH = '[Header] Toggle search bar';
const TOGGLE_MENU = '[Header] Toggle menu';
const SEARCH = '[Header] Search';
const SEARCH_RESULT = '[Header] Search result';

interface IToggleSearch {
  type: '[Header] Toggle search bar';
}

const makeToggleSearchAction = () => ({ type: TOGGLE_SEARCH });

interface IToggleMenu {
  type: '[Header] Toggle menu';
}

const makeToggleMenuAction = () => ({ type: TOGGLE_MENU });

interface ISearch {
  type: '[Header] Search';
  payload: string;
}

const makeSearchAction = (payload: string) => ({ type: SEARCH, payload });

interface ISearchResultPayload {
  bands: IBand[];
  albums: IAlbum[];
}

interface ISearchResult {
  type: '[Header] Search result';
  payload: IResult<ISearchResultPayload>;
}

const [makeSearchResultSuccess, makeSearchResultFailed] =
  makeFailableActionCreators(SEARCH_RESULT);

type Action = IToggleSearch | IToggleMenu | ISearch | ISearchResult;

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
  makeSearchResultSuccess,
  makeSearchResultFailed,
  IState,
};