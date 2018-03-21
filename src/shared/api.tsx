
const toParams = function <T extends {}>(o: T) {
  return Object.keys(o).reduce(
    (p, k) => {
      p.set(k, o[k]);
      return p;
    },
    new URLSearchParams()
  );
};

export { toParams };