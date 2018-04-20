import { IBand, toParams } from '../shared';
import { ISearchRequest } from './types';

interface ISearchResult {
  count: number;
  result: IBand[];
}

const searchBands = async (req: ISearchRequest) => {
  const res = await fetch(
    '/api/band?' + toParams(req).toString(),
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

export { searchBands, ISearchResult };