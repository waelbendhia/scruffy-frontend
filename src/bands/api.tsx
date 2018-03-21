import { Band } from '../shared';
import { SearchRequest } from './types';

interface SearchResult {
  count: number;
  result: Band[];
}
const searchBands = async (req: SearchRequest) => {
  const params = new URLSearchParams();
  Object.keys(req).forEach(k => params.set(k, req[k]));
  const res = await fetch(
    '/api/band?' + params.toString(),
    { method: 'GET', },
  );
  return await res.json() as SearchResult;
};

export { searchBands, SearchResult };