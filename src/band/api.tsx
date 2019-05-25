import { Band, get } from '../shared';
import { BandRequest } from './types';

export const getBand = (req: BandRequest) =>
  get<Band>(`/api/bands/${req.vol}/${req.url}`, Band);
