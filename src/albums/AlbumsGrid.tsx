import * as React from 'react';
import { SmallCard, ILoadable, IAlbum, Grid } from '../shared';
import { StyleSheet, css } from 'aphrodite/no-important';

const defaultImage = require('./albumDefault.svg') as string;

const styles = StyleSheet.create({
  band: {
    fontSize: '0.8em',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  album: {
    fontSize: '0.9em',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  date: { fontSize: '0.8em' }
});

interface IGridProps {
  className?: string;
  albums: ILoadable<IAlbum[]>;
  changePage: (_: number) => void;
}

const AlbumsGrid = (props: IGridProps) => (
  <Grid
    {...props}
    data={props.albums}
    cell={a => (
      <SmallCard
        key={(a.band ? a.band.url : '') + a.name}
        bgUrl={a.imageUrl || defaultImage}
        url={a.band ? a.band.url : ''}
      >
        <div className={css(styles.band)}>{!!a.band ? a.band.name : ''}</div>
        <div className={css(styles.album)}>
          <b>{a.name}</b>
          <span className={css(styles.date)}>
            &nbsp;({a.year !== 0 ? a.year : 'NA'})
          </span>
        </div>
        <div>{a.rating}/10</div>
      </SmallCard>
    )}
    minRows={2}
  />
);

export default AlbumsGrid;