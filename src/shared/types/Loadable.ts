import * as r from './Result';
import { monad as M, functor as F } from 'fp-ts';

export const URI = 'Loadable';
export type URI = typeof URI;

export class NotRequested<A> {
  readonly tag: 'NotRequested' = 'NotRequested';
  readonly _URI!: URI;
  readonly _A!: A;
  map = <B>(_: (_: A) => B) => new NotRequested<B>();
  ap = <B>(_: Loadable<(a: A) => B>) => new NotRequested<B>();
  chain = <B>(_: (a: A) => Loadable<B>) => new NotRequested<B>();
  caseOf = <B>(cases: CaseMatch<A, B>) => cases.NotRequested();
  withDefault = (def: A): A => def;
}

export class Loading<A> {
  readonly tag: 'Loading' = 'Loading';
  readonly _URI!: URI;
  readonly _A!: A;
  map = <B>(_: (_: A) => B) => new Loading<B>();
  ap = <B>(fab: Loadable<(a: A) => B>) =>
    fab.tag === 'NotRequested'
      ? new NotRequested<B>()
      : fab instanceof r.Error
      ? new r.Error<B>(fab.value)
      : new Loading<B>();
  chain = <B>(_: (a: A) => Loadable<B>) => new Loading<B>();
  caseOf = <B>(cases: CaseMatch<A, B>) => cases.Loading();
  withDefault = (def: A): A => def;
}

export type Loadable<A> = Pick<
  r.Result<A> | Loading<A> | NotRequested<A>,
  'tag' | '_URI' | '_A'
> & {
  map: <B>(_: (_: A) => B) => Loadable<B>;
  ap: <B>(fab: Loadable<(a: A) => B>) => Loadable<B>;
  chain: <B>(_: (a: A) => Loadable<B>) => Loadable<B>;
  caseOf: <B>(cases: CaseMatch<A, B>) => B;
  withDefault: (def: A) => A;
};

const ap = <A, B>(fab: Loadable<(a: A) => B>, fa: Loadable<A>) => fa.ap(fab);

const map = <A, B>(fa: Loadable<A>, fab: (a: A) => B): Loadable<B> => {
  if (fa._URI === 'Result') {
    return fa.tag === 'Ok' ? fa.map(fab) : fa.map(fab);
  }
  return fa.tag === 'NotRequested' ? fa.map(fab) : fa.map(fab);
};

const of = <T>(a: T): Loadable<T> => new r.Ok<T>(a);

const chain = <A, B>(
  fa: Loadable<A>,
  fab: (a: A) => Loadable<B>,
): Loadable<B> => fa.chain(fab);

export const caseOf = <A, B>(cases: CaseMatch<A, B>, x: Loadable<A>): B =>
  x._URI === 'Result' ? x.caseOf(cases) : x.caseOf(cases);

export type CaseMatch<A, B> = r.CaseMatch<A, B> & {
  Loading: () => B;
  NotRequested: () => B;
};

export const loadable: M.Monad<URI | r.URI> & F.Functor<URI | r.URI> = {
  URI,
  of,
  ap,
  map,
  chain,
};
