
import { createStore, applyMiddleware, combineReducers } from 'redux';
import {
  RouterState, routerMiddleware, routerReducer,
} from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import { Store } from 'react-redux';
export const history = createHistory();

interface State {
  router: RouterState;
}

const initialState: State = {
  router: { location: null },
};

const store: Store<State> = createStore(
  combineReducers({
    router: routerReducer
  }),
  initialState,
  applyMiddleware(routerMiddleware(history)),
);
export default store;