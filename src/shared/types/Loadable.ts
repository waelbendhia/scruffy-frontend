import { ResultTypes, IResultMatch } from './Result';

const LoadableTypes = {
  ...ResultTypes,
  loading: Symbol(':loading')
};

interface ILoadableMatch<T, TOk, TErr, TLoad>
  extends IResultMatch<T, TOk, TErr> {
  loading: () => TLoad;
}

interface ILoadable<T> {
  type: Symbol;
  bind<T2>(f: (_: T) => ILoadable<T2>): ILoadable<T2>;
  map<T2>(f: (_: T) => T2): ILoadable<T2>;
  withDefault<T2>(_: T2): (T | T2);
  caseOf<TOk, TErr, TLoad>(
    fn: ILoadableMatch<T, TOk, TErr, TLoad>
  ): (TOk | TErr | TLoad);
}

const Loading = <T>(): ILoadable<T> => ({
  type: LoadableTypes.loading,
  bind: <T2>(f: (_: T) => ILoadable<T2>) => Loading<T2>(),
  map: <T2>(f: (_: T) => T2) => Loading<T2>(),
  withDefault: <T2>(d: T2) => d,
  caseOf: <TOk, TErr, TLoad>(
    fn: ILoadableMatch<T, TOk, TErr, TLoad>
  ) => fn.loading(),
});

export {
  LoadableTypes,
  ILoadable,
  Loading,
};