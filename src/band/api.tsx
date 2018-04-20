import { IBand } from '../shared';
import { IBandRequest } from './types';

const getBand = async (req: IBandRequest) => {
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
  return await res.json() as IBand;
};

export { getBand };