import { IAlbum, toParams } from '../shared';
import { ISearchRequest } from './types';

interface ISearchResult {
  count: number;
  result: IAlbum[];
}

const searchAlbums = async (req: ISearchRequest) => {
  const res = await fetch(
    '/api/album?' + toParams(req).toString(),
    { method: 'GET', },
  );
  await new Promise((r, _) => {
    let timeout = setTimeout(
      () => {
        clearTimeout(timeout);
        r();
      },
      200
    );
  }
  );
  return await res.json() as ISearchResult;
};

export { searchAlbums, ISearchResult };