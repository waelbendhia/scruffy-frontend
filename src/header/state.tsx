import {
  IState,
  Action,
  TOGGLE_SEARCH,
  SEARCH,
  ISearch,
  makeSearchResultAction,
  SEARCH_RESULT,
  TOGGLE_MENU,
} from './types';
import { call, put, all, takeLatest } from 'redux-saga/effects';
import { searchBandsAndAlbums } from './api';

const initialState: IState = {
  menuOpen: false,
  open: false,
  search: '',
  bands: [],
  albums: [],
};

function* fetchBands(action: ISearch) {
  try {
    const [bands, albums] =
      yield call(searchBandsAndAlbums.bind(null, action.term));
    yield put(makeSearchResultAction(bands, albums));
  } catch (e) {
    yield put(makeSearchResultAction([], [], e));
  }
}

function* effects() {
  yield all([
    takeLatest(SEARCH, fetchBands),
  ]);
}

const reducer = (state = initialState, action: Action): IState => {
  switch (action.type) {
    case TOGGLE_SEARCH:
      return { ...state, open: !state.open };
    case TOGGLE_MENU:
      return { ...state, menuOpen: !state.menuOpen };
    case SEARCH:
      return { ...state, search: action.term };
    case SEARCH_RESULT:
      return { ...state, bands: action.bands, albums: action.albums };
    default:
      return { ...state, open: false };
  }
};

export { reducer, initialState, effects };