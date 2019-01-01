import { IBandWithInfluence, isBandWithInfluence } from './types';
import { get } from '../shared';
import { assertArray } from '../shared/types/Other';
import { isNumber } from 'util';

const getInfluential = () => get<IBandWithInfluence>(
    '/api/band/influential',
    isBandWithInfluence,
);

const getDistribution = () =>
    get<number[]>(
        '/api/album/distribution',
        (x: unknown): x is number[] => assertArray(x, isNumber),
    );

const getBandCount = () => get<number>('/api/band/total', isNumber);

const getAlbumCount = () => get<number>('/api/album/total', isNumber);

export { getInfluential, getDistribution, getBandCount, getAlbumCount };