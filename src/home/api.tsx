import { IBandWithInfluence } from './types';

const getInfluential = async () =>
  (await
    (await fetch(
      '/api/band/influential',
      { method: 'GET' },
    )).json()
  ) as IBandWithInfluence;

const getDistribution = async () =>
  (await
    (await fetch(
      '/api/album/distribution',
      { method: 'GET' },
    )).json()
  ) as number[];

const getBandCount = async () =>
  (await
    (await fetch(
      '/api/band/total',
      { method: 'GET' },
    )).json()
  ) as number;

const getAlbumCount = async () =>
  (await
    (await fetch(
      '/api/album/total',
      { method: 'GET' },
    )).json()
  ) as number;

export { getInfluential, getDistribution, getBandCount, getAlbumCount };