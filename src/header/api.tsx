import { IBand, toParams, IAlbum, get } from '../shared';
import { SortBy } from '../albums';

interface IBandSearchResult {
  result: IBand[];
}
interface IAlbumSearchResult {
  result: IAlbum[];
}

const searchBandsAndAlbums =
  async (term: string): Promise<[IBand[], IAlbum[]]> => {
    term = term.trim();

    if (!term) { return [[], []]; }

    const params = {
      name: term,
      sortBy: SortBy.RATING,
      numberOfResults: 3,
      includeUnknown: true,
    };

    const [{ result: bands }, { result: albums }] = await Promise.all([
      get<IBandSearchResult>('/api/band?' + toParams(params)),
      get<IAlbumSearchResult>('/api/album?' + toParams(params)),
    ]);

    return [bands, albums];
  };

export { searchBandsAndAlbums };