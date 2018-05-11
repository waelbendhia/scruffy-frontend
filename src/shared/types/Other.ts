
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

const callIfFunc = <T1, T2>(f: (T2 | ((_: T1) => T2)), arg: T1) =>
  typeof f === 'function' ? f(arg) : f;

const bound = (min: number, max: number, val: number) =>
  Math.max(Math.min(val, max), min);

export {
  IBand,
  IAlbum,
  bound,
  callIfFunc,
};