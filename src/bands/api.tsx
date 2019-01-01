import { IBand, toParams, get } from '../shared';
import { ISearchRequest } from './types';
import { assertArray, isBand } from '../shared/types/Other';

interface ISearchResult {
  count: number;
  result: IBand[];
}

const isSearchResult = (x: unknown): x is ISearchResult => {
  if (!(x instanceof Object)) { return false; }
  const res = x as Partial<ISearchResult>;
  return !!res &&
    !!res.count && typeof res.count === 'number' &&
    !!res.result && assertArray(res.result, isBand);
};

const searchBands = async (req: ISearchRequest) =>
  get<ISearchResult>('/api/band?' + toParams(req).toString(), isSearchResult);

export { searchBands, ISearchResult };