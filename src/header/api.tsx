import { Band, Album, get } from '../shared';
import { SortBy } from '../albums';
import { either } from 'fp-ts';
import * as t from 'io-ts';

const BandSearchResult = t.type({ data: t.array(Band) });

export type BandSearchResult = t.TypeOf<typeof BandSearchResult>;

const AlbumSearchResult = t.type({ data: t.array(Album) });

export type AlbumSearchResult = t.TypeOf<typeof AlbumSearchResult>;

const searchBandsAndAlbums = async (
  term: string,
): Promise<either.Either<t.Errors, [Band[], Album[]]>> => {
  term = term.trim();

  if (!term) {
    return new either.Right([[], []]);
  }

  const params = {
    name: term,
    sortBy: SortBy.RATING,
    itemsPerPage: 3,
    includeUnknown: true,
  };

  const [bands, albums] = await Promise.all([
    get('/api/bands', BandSearchResult, params),
    get('/api/albums', AlbumSearchResult, params),
  ]);
  return bands.chain(bs => albums.map(as => [bs.data, as.data]));
};

export { searchBandsAndAlbums };
