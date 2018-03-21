import * as React from 'react';
import { State } from './types';

const View = (props: State) => (
  <div>{JSON.stringify(props)}</div>
);

export default View;