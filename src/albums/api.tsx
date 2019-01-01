import { IAlbum, toParams, get } from '../shared';
import { ISearchRequest } from './types';
import { assertArray, isAlbum } from '../shared/types/Other';

interface ISearchResult {
  count: number;
  result: IAlbum[];
}

const isSearchResult = (x: unknown): x is ISearchResult => {
  if (!(x instanceof Object)) { return false; }
  const s = x as undefined | null | Partial<ISearchResult>;
  return !!s &&
    !!s.count && typeof s.count === 'number' &&
    !!s.result && assertArray(s.result, isAlbum);
};

const searchAlbums = (req: ISearchRequest) =>
  get<ISearchResult>(
    '/api/album?' + toParams(req).toString(),
    isSearchResult,
  );

export { searchAlbums, ISearchResult };