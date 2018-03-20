import * as React from 'react';
import { State } from './types';
import { css } from 'aphrodite/no-important';
import styles from './styles';

const View = ({ influential, ratings, count }: State) => (
  <div>
    <h1 className={css(styles.title)}>Scaruffi2.0</h1>
    Home
    <br />
    influential:{JSON.stringify(influential)}
    <br />
    ratings:{JSON.stringify(ratings)}
    <br />
    count:{JSON.stringify(count)}
    <br />
    loading:{JSON.stringify(
      influential.loading || ratings.loading || count.loading
    )}
  </div>
);

export default View;