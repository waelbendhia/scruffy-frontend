import { IBand, toParams, IAlbum } from '../shared';
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
    const [bandsRes, albumsRes] = await Promise.all(
      ['/api/band?', '/api/album?']
        .map(endpoint =>
          fetch(
            endpoint + toParams({
              name: term,
              sortBy: SortBy.RATING,
              numberOfResults: 3,
              includeUnknown: true,
            }).toString(),
            { method: 'GET', },
          ),
      ));
    const [{ result: bands }, { result: albums }] = [
      await bandsRes.json() as IBandSearchResult,
      await albumsRes.json() as IAlbumSearchResult,
    ];

    return [bands, albums];
  };

export { searchBandsAndAlbums };