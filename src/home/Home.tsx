import * as React from 'react';
import { State } from './types';
import { css } from 'aphrodite/no-important';
import styles from './styles';
import RatingHistogram from './RatingHistogram';
import { mapLoadable } from '../shared';

const View = (props: State) => (
  <div className={css(styles.root)}>
    <h1 className={css(styles.title)}>Scaruffi2.0</h1>
    <div className={css(styles.text)}>
      <p>
        In which I attempt to organize the award winning
        <br />music, film, political and scientific
        <br />historian Scaruffi's knowledge base of film and music.
      </p>
    </div>
    {mapLoadable(
      props,
      // TODO: Display error message
      e => e.message,
      // TODO: replace with loading indicator
      'Loading',
      data => [
        <h1 key="stats">Statistics</h1>,
        <div key="counts" className={css(styles.flexRow)}>
          <div className={css(styles.counts)} >
            <span className={css(styles.label)}>Bands reviewed:</span>
            <span>{data.bandCount}</span>
            <span className={css(styles.label)}>Albums reviewed:</span>
            <span>{data.albumCount}</span>
          </div>
        </div>,
        <div key="histo" className={css(styles.flexRow)}>
          <RatingHistogram {...data.ratings} />
        </div>,
      ]
    )}
  </div>
);

export default View;