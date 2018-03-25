import { Band } from '../shared';
import { BandRequest } from './types';

const getBand = async (req: BandRequest) => {
  const res = await fetch(
    `/api/band/${req.vol}/${req.url}`,
    { method: 'GET' },
  );
  await new Promise((r, _) => {
    let timeout = setTimeout(
      () => {
        clearTimeout(timeout);
        r();
      },
      200
    );
  }
  );
  return await res.json() as Band;
};

export { getBand };