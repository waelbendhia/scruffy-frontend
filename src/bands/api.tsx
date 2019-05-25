import { Band, get } from '../shared';
import { SearchRequest } from './types';
import * as t from 'io-ts';

const SearchResult = t.type({ count: t.number, data: t.array(Band) });
export type SearchResult = t.TypeOf<typeof SearchResult>;

export const searchBands = async (req: SearchRequest) =>
  get('/api/bands', SearchResult, req);
