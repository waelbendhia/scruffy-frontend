import { BandWithInfluence } from './types';
import { get } from '../shared';
import * as t from 'io-ts';

export const getInfluential = () =>
  get<BandWithInfluence>('/api/band/influential', BandWithInfluence);

const Distribution = t.array(t.number);

export const getDistribution = () =>
  get<number[]>('/api/album/distribution', Distribution);

export const getBandCount = () => get('/api/band/total', t.number);

export const getAlbumCount = () => get('/api/album/total', t.number);
