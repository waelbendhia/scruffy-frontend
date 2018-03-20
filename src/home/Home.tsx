import * as React from 'react';
import { Err, styles as sharedStyles } from '../shared';
import { State } from './types';
import { css } from 'aphrodite/no-important';
import styles from './styles';
import { StyleSheet } from 'aphrodite/no-important';

const View = (props: State) => (console.log(props), (
  <div className={css(styles.root)}>
    <h1 className={css(styles.title)}>Scaruffi2.0</h1>
    <div className={css(styles.text)}>
      <p>
        In which I attempt to organize the award winning
        <br />music, film, political and scientific
        <br />historian Scaruffi's knowledge base of film and music.
      </p>
    </div>
    {
      props instanceof Err
        ? props.message
        : props.loading
          ? 'Loading'
          : [
            <div key="counts" className={css(styles.counts)} >
              <span className={css(styles.label)}>Bands reviewed:</span>
              <span>{props.data.bandCount}</span>
              <span className={css(styles.label)}>Albums reviewed:</span>
              <span>{props.data.albumCount}</span>
            </div>,
            <Rating key="histo" ratings={ratingsToArray(props.data.ratings)} />,
          ]
    }
  </div>
));

const height = (h: number, max: number) =>
  StyleSheet.create({
    bar: {
      height: `${100 * h / max}%`,
      backgroundColor: 'red',
      'align-self': 'end',
      justifySelf: 'center',
      width: '80%',
    }
  });

const Rating = ({ ratings }: { ratings: number[] }) => {
  const max = Math.max(...ratings);
  return (
    <div
      className={css(
        sharedStyles.card,
        sharedStyles.elevation4,
        styles.histogram,
      )}
    >
      {ratings.map((c, i) =>
        <span
          key={'c' + i}
          className={css(styles.cell, height(c, max).bar)}
        />
      )}
      {ratings.map((_, i) =>
        <span
          key={'i' + i}
          className={css(styles.cell)}
        >
          {i / 2}
        </span>
      )}
    </div>
  );
};

const ratingsToArray = (ratings: { [rating: string]: number }): number[] => {
  const sanRatings = Object.keys(ratings)
    .map(n => ({
      rating: parseFloat(n),
      count: ratings[n]
    })).
    sort((a, b) => a.rating - b.rating);
  return new Array(20)
    .fill(0)
    .map(
      (_, i) =>
        (
          sanRatings.find(({ rating }) => rating * 2 === i) ||
          { count: 0 }
        ).count
    );
};
{/* <br />;
influential: { JSON.stringify(influential); }
<br />;
ratings: { JSON.stringify(ratings); }
<br />;
count: { JSON.stringify(count); }
<br />;
loading: {
  JSON.stringify(
    influential.loading || ratings.loading || count.loading
  );
} */}

export default View;