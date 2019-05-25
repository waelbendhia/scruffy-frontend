import { monad as M } from 'fp-ts';

export const URI = 'Result';

export type URI = typeof URI;

export class Error<A> {
  readonly tag: 'Error' = 'Error';
  readonly _URI!: URI;
  readonly _A!: A;
  constructor(readonly value: unknown) {}
  map = <B>(_: (_: A) => B) => new Error<B>(this.value);
  ap = <B>(fab: Result<(a: A) => B>): Result<B> =>
    new Error<B>(fab instanceof Error ? fab.value : this.value);
  chain = <B>(_: (a: A) => Result<B>) => new Error<B>(this.value);
  caseOf = <B>(cases: CaseMatch<A, B>) => cases.Error(this.value);
  withDefault = (def: A): A => def;
}

export class Ok<A> {
  readonly tag: 'Ok' = 'Ok';
  readonly _URI!: URI;
  readonly _A!: A;
  constructor(readonly value: A) {}
  map = <B>(f: (a: A) => B): Result<B> => new Ok<B>(f(this.value));
  ap = <B>(fab: Result<(a: A) => B>): Result<B> =>
    // @ts-ignore
    fab instanceof Ok ? this.map(fab.value) : new Error<B>(fab.value);
  chain = <B>(f: (a: A) => Result<B>) => f(this.value);
  caseOf = <B>(cases: CaseMatch<A, B>) => cases.Ok(this.value);
  withDefault = (_: A): A => this.value;
}

export type Result<A> = Pick<Error<A> | Ok<A>, 'tag' | '_URI' | '_A'> & {
  map: <B>(_: (_: A) => B) => Result<B>;
  ap: <B>(fab: Result<(a: A) => B>) => Result<B>;
  chain: <B>(_: (a: A) => Result<B>) => Result<B>;
  caseOf: <B>(cases: CaseMatch<A, B>) => B;
  withDefault: (def: A) => A;
};

const ap = <A, B>(fab: Result<(a: A) => B>, fa: Result<A>) =>
  fa.tag === 'Error' ? fa.ap(fab) : fa.ap(fab);

const map = <A, B>(fa: Result<A>, fab: (a: A) => B) =>
  fa.tag === 'Error' ? fa.map(fab) : fa.map(fab);

const of = <T>(a: T) => new Ok(a);

const chain = <A, B>(fa: Result<A>, fab: (a: A) => Result<B>): Result<B> =>
  fa.tag === 'Error' ? fa.chain(fab) : fa.chain(fab);

export const caseOf = <A, B>(cases: CaseMatch<A, B>, fa: Result<A>): B =>
  fa.caseOf(cases);

export type CaseMatch<A, B> = {
  Ok: (_: A) => B;
  Error: (_: unknown) => B;
};

export const result: M.Monad<URI> = {
  URI,
  of,
  ap,
  map,
  chain,
};
