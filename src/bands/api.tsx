import { Band, toParams } from '../shared';
import { SearchRequest } from './types';

interface SearchResult {
  count: number;
  result: Band[];
}

const searchBands = async (req: SearchRequest) => {
  const res = await fetch(
    '/api/band?' + toParams(req).toString(),
    { method: 'GET', },
  );
  return await res.json() as SearchResult;
};

export { searchBands, SearchResult };