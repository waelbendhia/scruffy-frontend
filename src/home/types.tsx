import { Band, Loadable } from '../shared';

interface HomeData {
  ratings: { [rating: string]: number };
  influential: BandWithInfluence[];
  bandCount: number;
  albumCount: number;
}
interface BandWithInfluence extends Band {
  influence: number;
}
type State = Loadable<HomeData>;

const GET_DATA = '[Home] Get data';
const DON_DATA = '[Home] Get data done';

const makeGetDataAction = () => ({ type: GET_DATA }),
  makeGetDataDone =
    (data: HomeData | null, error: string | null) =>
      ({ type: DON_DATA, data, error });
interface GetDataAction {
  readonly type: '[Home] Get data';
}

interface GetDataDone {
  readonly type: '[Home] Get data done';
  data: HomeData | null;
  error: string | null;
}

type Action =
  GetDataAction |
  GetDataDone;

export {
  BandWithInfluence,
  State,
  GET_DATA, DON_DATA,
  GetDataAction,
  GetDataDone,
  makeGetDataAction,
  makeGetDataDone,
  Action,
};