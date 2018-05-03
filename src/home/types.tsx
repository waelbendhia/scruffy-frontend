import {
  IBand,
  makeFailableActionCreators,
  ILoadable,
  IResult,
} from '../shared';

interface IHomeData {
  ratings: { [rating: string]: number };
  influential: IBandWithInfluence[];
  bandCount: number;
  albumCount: number;
}
interface IBandWithInfluence extends IBand {
  influence: number;
}
type State = ILoadable<IHomeData>;

const GET_DATA = '[Home] Get data';
const DON_DATA = '[Home] Get data done';

interface IGetDataAction {
  readonly type: '[Home] Get data';
}

const makeGetDataAction = () => ({ type: GET_DATA });

interface IGetDataDone {
  readonly type: '[Home] Get data done';
  payload: IResult<IHomeData>;
}
const [makeGetDataSuccess, makeGetDataFailed] =
  makeFailableActionCreators<IHomeData>(DON_DATA);

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
  makeGetDataSuccess,
  makeGetDataFailed,
  Action,
};