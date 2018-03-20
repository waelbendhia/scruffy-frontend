class Loadable<T> {
  constructor(
    public data: T,
    public loading: boolean,
    public error: string | null,
  ) { }
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

export { Band, Album, Loadable };