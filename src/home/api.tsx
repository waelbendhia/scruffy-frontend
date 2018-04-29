import { IBandWithInfluence } from './types';
import { get } from '../shared';

const getInfluential = () => get<IBandWithInfluence>('/api/band/influential');

const getDistribution = async () => get<number[]>('/api/album/distribution');

const getBandCount = async () => get<number>('/api/band/total');

const getAlbumCount = async () => get<number>('/api/album/total');

export { getInfluential, getDistribution, getBandCount, getAlbumCount };