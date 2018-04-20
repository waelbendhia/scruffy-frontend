import { IBand, Loadable } from '../shared';

interface IHomeData {
  ratings: { [rating: string]: number };
  influential: IBandWithInfluence[];
  bandCount: number;
  albumCount: number;
}
interface IBandWithInfluence extends IBand {
  influence: number;
}
type State = Loadable<IHomeData>;

const GET_DATA = '[Home] Get data';
const DON_DATA = '[Home] Get data done';

interface IGetDataAction {
  readonly type: '[Home] Get data';
}

const makeGetDataAction = () => ({ type: GET_DATA }),
  makeGetDataDone =
    (data: IHomeData | null, error: Error | null) =>
      ({ type: DON_DATA, data, error });
interface IGetDataDone {
  readonly type: '[Home] Get data done';
  data: IHomeData | null;
  error: Error | null;
}

type Action =
  IGetDataAction |
  IGetDataDone;

export {
  IBandWithInfluence,
  State,
  GET_DATA, DON_DATA,
  IGetDataAction,
  IGetDataDone,
  makeGetDataAction,
  makeGetDataDone,
  Action,
};