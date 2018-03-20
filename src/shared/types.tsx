type Loadable<T> = Loading | Err | LoadedData<T>;

class Loading {
  readonly loading = true;
}
class Err {
  constructor(public message: string) { }
}

class LoadedData<T>  {
  readonly loading = false;
  constructor(
    public data: T
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

export { Band, Album, Err, Loading, Loadable, LoadedData };