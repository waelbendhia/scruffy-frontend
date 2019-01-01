import { IBand, toParams, IAlbum, get } from '../shared';
import { SortBy } from '../albums';
import { assertArray, isBand, isAlbum } from '../shared/types/Other';

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
    const asserter =
      function <T>(fn: (x: unknown) => x is T):
        (y: unknown) => y is { result: T[] } {
        return (z: unknown): z is { result: T[] } => {
          if (!(z instanceof Array)) { return false; }
          const a = z as { result?: unknown[] };
          return !!a &&
            !!a.result && assertArray(z, fn);
        };
      };

    const [{ result: bands }, { result: albums }] = await Promise.all([
      get<IBandSearchResult>(
        '/api/band?' + toParams(params),
        asserter(isBand),
      ),
      get<IAlbumSearchResult>(
        '/api/album?' + toParams(params),
        asserter(isAlbum),
      ),
    ]);

    return [bands, albums];
  };

export { searchBandsAndAlbums };