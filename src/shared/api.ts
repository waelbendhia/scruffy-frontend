
const toParams = <T extends {}>(o: T) =>
  Object.keys(o).reduce(
    (p, k) => {
      p.set(k, o[k]);
      return p;
    },
    new URLSearchParams()
  );

const get = async <T>(url: string) => {
  const res = await fetch(url, { method: 'GET' });
  if (res.status < 200 || res.status >= 300) {
    throw new Error(res.statusText);
  }
  return (await res.json()) as T;
};

export { toParams, get };