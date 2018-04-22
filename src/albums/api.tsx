import { IAlbum, toParams } from '../shared';
import { ISearchRequest } from './types';

interface ISearchResult {
  count: number;
  result: IAlbum[];
}

const searchAlbums = async (req: ISearchRequest) =>
  await (
    await fetch('/api/album?' + toParams(req).toString(), { method: 'GET' })
  ).json() as ISearchResult;

export { searchAlbums, ISearchResult };