import { IBand, toParams, get } from '../shared';
import { ISearchRequest } from './types';

interface ISearchResult {
  count: number;
  result: IBand[];
}

const searchBands = async (req: ISearchRequest) =>
  get<ISearchResult>('/api/band?' + toParams(req).toString());

export { searchBands, ISearchResult };