import * as React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import {
  SmallCard,
  mapLoadable,
  Band,
  Loadable,
  Loading,
  definitions,
} from '../shared';
import { StyleSheet, css } from 'aphrodite';

const defaultImage = require('./bandDefault.svg') as string;

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
  }
});

interface GridProps {
  className?: string;
  bands: Loadable<Band[]>;
}

const BandsGrid = ({ className, bands }: GridProps) => (
  <TransitionGroup className={className}>
    {
      <CSSTransition
        key={
          mapLoadable(bands, 'error', 'loading', 'bands')
        }
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
            bands,
            e => JSON.stringify(e),
            <Loading className={css(styles.loading, styles.position)} />,
            bs =>
              <div className={css(styles.bandGrid, styles.position)}>
                {bs.map(b =>
                  <SmallCard
                    key={b.url}
                    bgUrl={b.imageUrl || defaultImage}
                    {...b}
                  >
                    {b.name}
                  </SmallCard>
                )}
              </div>
          )
        }
      </CSSTransition>
    }
  </TransitionGroup>
);

export default BandsGrid;