import { IBand, toParams } from '../shared';
import { ISearchRequest } from './types';

interface ISearchResult {
  count: number;
  result: IBand[];
}

const searchBands = async (req: ISearchRequest) =>
  await (
    await fetch('/api/band?' + toParams(req).toString(), { method: 'GET' })
  ).json() as ISearchResult;

export { searchBands, ISearchResult };