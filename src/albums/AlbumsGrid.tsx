import * as React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import {
  SmallCard,
  mapLoadable,
  Loadable,
  Loading,
  definitions,
  Album,
} from '../shared';
import { StyleSheet, css } from 'aphrodite';

const defaultImage = require('./albumDefault.svg') as string;

const styles = StyleSheet.create({
  bandGrid: {
    height: 'calc(100% - 32px)',
    width: 'calc(100% - 32px)',
    display: 'grid',
    gridGap: '16px',
    padding: '16px',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gridAutoRows: 'minmax(100px, 33%)',
  },
  loading: {
    height: '100%',
    width: '100%',
  },
  out: {
    opacity: 0,
    transitionDuration: definitions.transitions.fast,
    transitionProperty: 'transform opacity',
  },
  in: {
    opacity: 1,
    transitionDuration: definitions.transitions.fast,
    transitionProperty: 'transform opacity',
  },
  position: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  band: {
    fontSize: '0.8em',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  album: {
    fontSize: '0.9em',
    fontWeight: 700,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  date: { fontSize: '0.8em' }
});

interface GridProps {
  className?: string;
  albums: Loadable<Album[]>;
}

const AlbumsGrid = ({ className, albums }: GridProps) => (
  <TransitionGroup className={className}>
    {
      <CSSTransition
        key={mapLoadable(albums, 'error', 'loading', 'bands')}
        timeout={150}
        classNames={{
          appear: css(styles.in),
          appearActive: css(styles.out),
          enter: css(styles.out),
          enterActive: css(styles.in),
          exit: css(styles.out),
          exitActive: css(styles.in),
        }}
      >
        {
          mapLoadable(
            albums,
            e => JSON.stringify(e),
            <Loading className={css(styles.loading, styles.position)} />,
            as =>
              <div className={css(styles.bandGrid, styles.position)}>
                {as.map(a =>
                  <SmallCard
                    key={(a.band ? a.band.url : '') + a.name}
                    bgUrl={a.imageUrl || defaultImage}
                    url={a.band ? a.band.url : ''}
                  >
                    <div className={css(styles.band)}>
                      {!!a.band ? a.band.name : ''}
                    </div>
                    <div className={css(styles.album)}>
                      {a.name}
                    </div>
                    <div className={css(styles.date)}>
                      ({a.year !== 0 ? a.year : 'NA'})
                    </div>
                    <div>{a.rating}/10</div>
                  </SmallCard>)}
              </div>
          )
        }
      </CSSTransition>
    }
  </TransitionGroup>
);

export default AlbumsGrid;