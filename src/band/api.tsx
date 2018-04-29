import { IBand, get } from '../shared';
import { IBandRequest } from './types';

const getBand = (req: IBandRequest) =>
  get<IBand>(`/api/band/${req.vol}/${req.url}`);

export { getBand };