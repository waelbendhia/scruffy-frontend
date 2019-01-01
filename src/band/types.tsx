import {
  IBand,
  ILoadable,
  IAction,
  IActionFailable,
  failableActionCreator,
  actionCreator,
} from '../shared';

interface IBandRequest {
  vol: string;
  url: string;
}

type State = ILoadable<IBand>;

const GET_BND = '[Band] Get band';
const DON_BND = '[Band] Get band done';

type GetBandAction = IAction<typeof GET_BND, IBandRequest>;

const makeGetBandAction = (partialUrl: string) =>
  actionCreator<GetBandAction>('[Band] Get band')({
    vol: partialUrl.split('/')[2],
    url: partialUrl.split('/')[3].split('.')[0],
  });

type GetBandDone = IActionFailable<typeof DON_BND, IBand>;
const [makeGetBandSuccess, makeGetBandFailed] =
  failableActionCreator<GetBandDone>(DON_BND);

type Action = GetBandAction | GetBandDone;

export {
  IBandRequest,
  State,
  Action,
  GET_BND,
  GetBandAction,
  makeGetBandAction,
  DON_BND,
  GetBandDone,
  makeGetBandSuccess,
  makeGetBandFailed,
};
