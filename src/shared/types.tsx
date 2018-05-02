
class Err {
  readonly type = 'ERR';
  constructor(public err: Error) { }
}

class Ok<T> {
  readonly type = 'OK';
  constructor(public data: T) { }
}

type Failable<T> = Ok<T> | Err;

function makeFailableActionCreators<T>(actionType: string): [
  (data: T) => {
    type: string;
    payload: Ok<T>;
  },
  (e: Error) => {
    type: string;
    payload: Ok<Error>;
  }
] {
  return [
    (data: T) => ({ type: actionType, payload: new Ok(data) }),
    (e: Error) => ({ type: actionType, payload: new Ok(e) }),
  ];
}

function mapFailable<TOk, T1, T2>(
  x: Failable<TOk>,
  fOk: T1 | ((_: TOk) => T1),
  fErr: T2 | ((_: Error) => T2),
) {
  switch (x.type) {
    case 'ERR':
      return callIfFunc(fErr, x.err);
    default:
      return callIfFunc(fOk, x.data);
  }
}

class Loading {
  readonly type = 'LOADING';
}

type Loadable<T> = Loading | Failable<T>;

function mapLoadable<T, TOk, TErr, TLoad>(
  a: Loadable<T>,
  fSuccess: TOk | ((_: T) => TOk),
  fFailed: TErr | ((_: Error) => TErr),
  fLoading: TLoad | (() => TLoad),
) {
  switch (a.type) {
    case 'LOADING':
      return callIfFunc(fLoading, undefined);
    default:
      return mapFailable(a, fSuccess, fFailed);
  }
}

interface IAlbum {
  name: string;
  year: number;
  rating: number;
  imageUrl: string;
  band?: IBand;
}

interface IBand {
  url: string;
  fullUrl: string;
  name: string;
  bio: string;
  imageUrl?: string;
  relatedBands?: IBand[];
  albums?: IAlbum[];
}

function callIfFunc<T4, T5>(f: T4 | ((_: T5) => T4), arg: T5) {
  return typeof f === 'function' ? f(arg) : f;
}

function flatMap<T>(fn: (_: T) => T[], arr: T[]) {
  return arr.map(fn).reduce((p, c) => [...p, ...c], []);
}

export {
  IBand,
  IAlbum,
  flatMap,
  Failable,
  Ok,
  Err,
  mapFailable,
  makeFailableActionCreators,
  Loading,
  Loadable,
  mapLoadable,
};