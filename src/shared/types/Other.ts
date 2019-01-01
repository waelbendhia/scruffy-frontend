interface IAlbum {
  name: string;
  year: number;
  rating: number;
  imageUrl: string;
  band?: IBand;
}

const isAlbum = (x: unknown): x is IAlbum => {
  if (!(x instanceof Object)) { return false; }
  let a = x as Partial<IAlbum>;
  console.log(a);
  return !!a &&
    !!a.name && typeof a.name === 'string' &&
    (!a.year || typeof a.year === 'number') &&
    !!a.rating && typeof a.rating === 'number' &&
    (!a.imageUrl || typeof a.imageUrl === 'string') &&
    (!a.band || isBand(a.band));
};

interface IBand {
  url: string;
  fullUrl: string;
  name: string;
  bio: string;
  imageUrl?: string;
  relatedBands?: IBand[];
  albums?: IAlbum[];
}

const isBand = (x: unknown): x is IBand => {
  if (!(x instanceof Object)) { return false; }
  let b = x as Partial<IBand>;
  return !!b &&
    !!b.url && typeof b.url === 'string' &&
    !!b.name && typeof b.name === 'string' &&
    !!b.fullUrl && typeof b.fullUrl === 'string' &&
    (!b.bio || typeof b.bio === 'string') &&
    (!b.imageUrl || typeof b.imageUrl === 'string') &&
    (!b.relatedBands || assertArray(b.relatedBands, isBand)) &&
    (!b.albums || assertArray(b.albums, isAlbum));
};

const callIfFunc = <T1, T2>(f: (T2 | ((_: T1) => T2)), arg: T1) =>
  f instanceof Function ? f(arg) : f;

const bound = (min: number, max: number, val: number) =>
  Math.max(Math.min(val, max), min);

const assertArray = <T>(a: unknown, fn: (z: unknown) => z is T): a is T[] => {
  if (!(a instanceof Array)) { return false; }
  return a.every(fn);
};

export {
  IBand,
  isBand,
  IAlbum,
  isAlbum,
  assertArray,
  bound,
  callIfFunc,
};