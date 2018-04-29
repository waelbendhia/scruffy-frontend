import { IAlbum, toParams, get } from '../shared';
import { ISearchRequest } from './types';

interface ISearchResult {
  count: number;
  result: IAlbum[];
}

const searchAlbums = (req: ISearchRequest) =>
  get<ISearchResult>('/api/album?' + toParams(req).toString());

export { searchAlbums, ISearchResult };