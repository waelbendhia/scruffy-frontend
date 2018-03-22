type Loadable<T> = DataLoading | DataError | DataLoaded<T>;

class DataLoading {
  readonly loading = true;
  readonly failed = false;
}

class DataError {
  readonly loading = false;
  readonly failed = true;
  constructor(public error: Error) { }
}

class DataLoaded<T>  {
  readonly loading = false;
  readonly failed = false;
  constructor(public data: T) { }
}
interface Album {
  name: string;
  year: number;
  rating: number;
  imageUrl: string;
  band?: Band;
}

interface Band {
  url: string;
  fullUrl?: string;
  name: string;
  bio?: string;
  imageUrl?: string;
  relatedBands?: Band[];
  albums?: Album[];
}

function mapLoadable<T, T1, T2, T3>(
  a: Loadable<T>,
  failedF: (_: Error) => T1,
  loadingF: () => T2,
  successF: (_: T) => T3,
) {
  return a.failed
    ? failedF(a.error)
    : a.loading
      ? loadingF()
      : successF(a.data);
}

export {
  Band,
  Album,
  DataLoading,
  Loadable,
  DataLoaded,
  DataError,
  mapLoadable,
};