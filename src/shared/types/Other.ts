
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

const flatMap = <T>(fn: (_: T) => T[], arr: T[]) =>
  arr.map(fn).reduce((p, c) => [...p, ...c], []);

const bound = (min: number, max: number, val: number) =>
  Math.max(Math.min(val, max), min);

export {
  IBand,
  IAlbum,
  flatMap,
  bound,
};