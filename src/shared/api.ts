import Axios from 'axios';
import * as t from 'io-ts';

export const get = async <T>(
  url: string,
  decoder: t.Decoder<unknown, T>,
  params?: object,
) => Axios.get(url, { params: params }).then(res => decoder.decode(res.data));
