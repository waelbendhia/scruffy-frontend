import {
  IBand,
  failableActionCreator,
  ILoadable,
  IActionNoPayload,
  noPayloadActionCreator,
  IActionFailable,
} from '../shared';
import { isBand } from '../shared/types/Other';

interface IHomeData {
  ratings: { [rating: string]: number };
  influential: IBandWithInfluence[];
  bandCount: number;
  albumCount: number;
}
interface IBandWithInfluence extends IBand {
  influence: number;
}

const isBandWithInfluence = (x: unknown): x is IBandWithInfluence => {
  if (!isBand(x)) { return false; }
  const y = x as IBandWithInfluence;
  return !!y.influence && typeof y.influence === 'number';
};

type State = ILoadable<IHomeData>;

const GET_DATA = '[Home] Get data';
const DON_DATA = '[Home] Get data done';

type GetDataAction = IActionNoPayload<typeof GET_DATA>;
const makeGetDataAction = noPayloadActionCreator<GetDataAction>(GET_DATA);

type GetDataDone = IActionFailable<typeof DON_DATA, IHomeData>;

const [makeGetDataSuccess, makeGetDataFailed] =
  failableActionCreator<GetDataDone>(DON_DATA);

type Action = GetDataAction | GetDataDone;

export {
  IBandWithInfluence,
  isBandWithInfluence,
  State,
  GET_DATA, DON_DATA,
  GetDataAction,
  GetDataDone,
  makeGetDataAction,
  makeGetDataSuccess,
  makeGetDataFailed,
  Action,
};