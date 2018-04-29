
const toParams = function <T extends {}>(o: T) {
  return Object.keys(o).reduce(
    (p, k) => {
      p.set(k, o[k]);
      return p;
    },
    new URLSearchParams()
  );
};

const get = async function <T>(url: string) {
  const res = await fetch(url, { method: 'GET' });
  return (await res.json()) as T;
};

export { toParams, get };