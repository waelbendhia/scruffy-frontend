import { IBand, toParams, IAlbum } from '../shared';

interface IBandSearchResult {
  result: IBand[];
}
interface IAlbumSearchResult {
  result: IAlbum[];
}

const searchBandsAndAlbums =
  async (term: string): Promise<[IBand[], IAlbum[]]> => {
    term = term.trim();
    if (!term) {
      return [[], []];
    }
    const [bandsRes, albumsRes] = await Promise.all([
      fetch(
        '/api/band?' + toParams({ name: term, numberOfResults: 5 }).toString(),
        { method: 'GET', },
      ),
      fetch(
        '/api/album?' + toParams({ name: term, numberOfResults: 5 }).toString(),
        { method: 'GET', },
      ),
    ]);
    const [{ result: bands }, { result: albums }] = [
      await bandsRes.json() as IBandSearchResult,
      await albumsRes.json() as IAlbumSearchResult,
    ];

    return [bands, albums];
  };

export { searchBandsAndAlbums };