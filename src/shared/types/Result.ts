const ResultTypes = {
  ok: Symbol(':ok'),
  err: Symbol(':err')
};

interface IResultMatch<T, TOk, TErr> {
  ok: (_: T) => TOk;
  err: (_: Error) => TErr;
}

interface IResult<T> {
  type: Symbol;
  bind<T2>(f: (_: T) => IResult<T2>): IResult<T2>;
  map<T2>(f: (_: T) => T2): IResult<T2>;
  withDefault<TDef>(_: TDef): (T | TDef);
  caseOf<TOk, TErr>(fn: IResultMatch<T, TOk, TErr>): (TOk | TErr);
}

const Ok = <T>(v: T): IResult<T> => ({
  type: ResultTypes.ok,
  bind: <T2>(f: (_: T) => IResult<T2>) => f(v),
  map: <T2>(f: (_: T) => T2) => Ok(f(v)),
  withDefault: <T2>(_: T2) => v,
  caseOf: <T2, T3>(fn: IResultMatch<T, T2, T3>) => fn.ok(v),
});

const Err = <T>(e: Error): IResult<T> => ({
  type: ResultTypes.err,
  bind: <T2>(f: (_: T) => IResult<T2>) => Err<T2>(e),
  map: <T2>(f: (_: T) => T2) => Err<T2>(e),
  withDefault: <TDef>(d: TDef) => d,
  caseOf: <TOk, TErr>(fn: IResultMatch<T, TOk, TErr>) => fn.err(e),
});

const makeFailableActionCreators = <T>(actionType: string): [
  (data: T) => { type: string, payload: IResult<T> },
  (e: Error) => { type: string, payload: IResult<T> }
] =>
  [
    (data: T) => ({ type: actionType, payload: Ok(data) }),
    (e: Error) => ({ type: actionType, payload: Err(e) }),
  ];

export {
  ResultTypes,
  IResult,
  Err,
  Ok,
  IResultMatch,
  makeFailableActionCreators,
};