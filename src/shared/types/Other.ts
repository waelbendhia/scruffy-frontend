import * as t from 'io-ts';

export type Album = {
  name: string;
  year: null | number;
  rating: number;
  imageUrl: null | string;
  band: null | Band;
};

export const Album: t.Type<Album> = t.recursion('Album', () =>
  t.type({
    name: t.string,
    year: t.union([t.null, t.number]),
    rating: t.number,
    imageUrl: t.union([t.null, t.string]),
    band: t.union([t.null, Band]),
  }),
);

export type Band = {
  url: string;
  name: string;
  bio: null | string;
  relatedBands: Band[];
  albums: Album[];
  imageUrl: string | null;
};

export const Band: t.Type<Band> = t.recursion('Band', () =>
  t.type({
    url: t.string,
    name: t.string,
    bio: t.union([t.null, t.string]),
    relatedBands: t.array(Band),
    albums: t.array(Album),
    imageUrl: t.union([t.null, t.string]),
  }),
);

export const callIfFunc = <T1, T2>(f: T2 | ((_: T1) => T2), arg: T1) =>
  f instanceof Function ? f(arg) : f;

export const bound = (min: number, max: number, val: number) =>
  Math.max(Math.min(val, max), min);

type CanUnpack<T> = T extends (...args: unknown[]) => unknown
  ? 1
  : T extends Promise<unknown>
  ? 1
  : 0;

type _U<T> = T extends (...args: unknown[]) => infer U
  ? U
  : T extends Promise<infer U>
  ? U
  : T;

export type Unpack<T> = { 1: Unpack<_U<T>>; 0: T }[CanUnpack<T>];
