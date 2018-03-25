import { Band, Loadable } from '../shared';

interface BandRequest {
  vol: string;
  url: string;
}

type State = Loadable<Band>;

const GET_BND = '[Band] Get band';
const DON_BND = '[Band] Get band done';

interface GetBandAction {
  type: '[Band] Get band';
  req: BandRequest;
}

const makeGetBandAction =
  (partialUrl: string) => ({
    type: GET_BND,
    req: {
      vol: partialUrl.split('/')[2],
      url: partialUrl.split('/')[3].split('.')[0],
    }
  });

interface GetBandDone {
  type: '[Band] Get band done';
  band: Band | null;
  error: Error | null;
}

const makeGetBandDone =
  (band: Band | null, error: Error | null) =>
    ({ type: DON_BND, band, error });

type Action = GetBandAction | GetBandDone;

export {
  BandRequest,
  State,
  Action,
  GET_BND,
  GetBandAction,
  makeGetBandAction,
  DON_BND,
  makeGetBandDone,
};
