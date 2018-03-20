import { BandWithInfluence } from './types';

const getInfluential = async () =>
  (await
    (await fetch(
      '/api/band/influential',
      { method: 'GET' },
    )).json()
  ) as BandWithInfluence;

const getDistribution = async () =>
  (await
    (await fetch(
      '/api/album/distribution',
      { method: 'GET' },
    )).json()
  ) as number[];

const getCount = async () =>
  (await
    (await fetch(
      '/api/band/total',
      { method: 'GET' },
    )).json()
  ) as number;

export { getInfluential, getDistribution, getCount };