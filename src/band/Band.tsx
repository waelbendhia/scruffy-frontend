import * as React from 'react';
import { IBand, Loadable, Loading, mapLoadable, definitions } from '../shared';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { css, StyleSheet } from 'aphrodite/no-important';
import BandView from './BandView';

const styles = StyleSheet.create({
  container: {
    minHeight: `calc(100vh - ${definitions.headerHeight})`,
    paddingBottom: '48px',
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

const View = (band: Loadable<IBand>) => (
  <TransitionGroup className={css(styles.container)}>
    {
      <CSSTransition
        key={mapLoadable(band, 'error', 'loading', 'bands')}
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
        {mapLoadable(
          band,
          e => JSON.stringify(e),
          <Loading className={css(styles.loading, styles.position)} />,
          b => <BandView {...b} />
        )}
      </CSSTransition>
    }
  </TransitionGroup>
);

export default View;