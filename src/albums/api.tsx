import { Album, get } from '../shared';
import { SearchRequest } from './types';
import * as t from 'io-ts';

export const SearchResult = t.type({ count: t.number, data: t.array(Album) });
export type SearchResult = t.TypeOf<typeof SearchResult>;

export const searchAlbums = (req: Partial<SearchRequest>) =>
  get('/api/albums', SearchResult, {
    ...req,
    sortBy: `${req.sortBy},${req.sortOrderAsc ? 'asc' : 'desc'}`,
  });
