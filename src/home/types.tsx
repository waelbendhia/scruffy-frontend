import {
  Band,
  failableActionCreator,
  Loadable,
  IActionNoPayload,
  noPayloadActionCreator,
  IActionFailable,
} from '../shared';
import * as t from 'io-ts';

interface IHomeData {
  ratings: { [rating: string]: number };
  influential: BandWithInfluence[];
  bandCount: number;
  albumCount: number;
}

export const BandWithInfluence = t.intersection([
  Band,
  t.type({ influence: t.number }),
]);

export type BandWithInfluence = t.TypeOf<typeof BandWithInfluence>;

export type State = Loadable<IHomeData>;

export const GET_DATA = '[Home] Get data';
export const DON_DATA = '[Home] Get data done';

export type GetDataAction = IActionNoPayload<typeof GET_DATA>;

export const makeGetDataAction = noPayloadActionCreator<GetDataAction>(
  GET_DATA,
);

export type GetDataDone = IActionFailable<typeof DON_DATA, IHomeData>;

export const [makeGetDataSuccess, makeGetDataFailed] = failableActionCreator<
  GetDataDone
>(DON_DATA);

export type Action = GetDataAction | GetDataDone;
