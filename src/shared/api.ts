
const toParams = <T extends {}>(o: T) =>
  Object.keys(o).reduce(
    (p, k) => {
      p.set(k, o[k]);
      return p;
    },
    new URLSearchParams()
  );

const get = async <T>(url: string, asserter: (z: unknown) => z is T) => {
  const res = await fetch(url, { method: 'GET' });
  if (res.status < 200 || res.status >= 300) {
    throw new Error(res.statusText);
  }
  const resp = await res.json();
  if (asserter(resp)) { return resp; }
  throw 'response is an unexpected format';
};

export { toParams, get };