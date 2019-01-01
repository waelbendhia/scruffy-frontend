import { IBand, get } from '../shared';
import { IBandRequest } from './types';
import { isBand } from '../shared/types/Other';

const getBand = (req: IBandRequest) =>
  get<IBand>(`/api/band/${req.vol}/${req.url}`, isBand);

export { getBand };