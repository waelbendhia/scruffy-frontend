import * as React from 'react';
import { State, makeGetBandsAction } from './types';
import BandCard from './BandCard';
import { StyleSheet, css } from 'aphrodite';
import {
  Loading,
  definitions,
  styles as sharedStyles,
  mapLoadable,
} from '../shared';
import store from '../store';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const styles = StyleSheet.create({
  layoutGrid: {
    display: 'grid',
    gridTemplateColumns: 'minmax(20%, 200px) 1fr',
  },
  bandGrid: {
    height: `calc(100vh - ${definitions.headerHeight} - 32px)`,
    display: 'grid',
    gridGap: '16px',
    padding: '16px',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gridTemplateRows: 'minmax(10px, 33%)',
  },
  filters: {
    backgroundColor: definitions.colors.white,
  },
  enter: {
    opacity: 0,
    transform: 'translateY(10px)',
    transitionDuration: definitions.transitions.slow,
  },
  enterActive: {
    opacity: 1,
    // position: 'absolute',
    // width: '100%',
    transform: 'translateY(0px)',
  },
  exit: {
    opacity: 1,
    transform: 'translateY(0px)',
  },
  exitActive: {
    opacity: 0,
    // position: 'absolute',
    // width: '100%',
    transform: 'translateY(10px)',
    transitionDuration: definitions.transitions.slow,
  },
});

const View = (props: State) => (
  <div className={css(styles.layoutGrid)}>
    <div className={css(styles.filters, sharedStyles.elevation2)} >
      <div>
        Name:
        <input
          type="text"
          onChange={
            e =>
              store.dispatch(makeGetBandsAction({ name: e.target.value }))
          }
        />
      </div>
    </div>
    <TransitionGroup>
      {
        <CSSTransition
          key={
            mapLoadable(
              props.bands,
              () => 'error',
              () => 'loading',
              () => 'bands',
            )
          }
          timeout={300}
          classNames={{
            appear: css(styles.enter),
            appearActive: css(styles.enterActive),
            enter: css(styles.enter),
            enterActive: css(styles.enterActive),
            exit: css(styles.exit),
            exitActive: css(styles.exitActive),
          }}
        >
          {
            mapLoadable(
              props.bands,
              e => JSON.stringify(e),
              () => <Loading />,
              bands =>
                <div className={css(styles.bandGrid)}>
                  {bands.map(b => <BandCard key={b.url} {...b} />)}
                </div>
            )
          }
        </CSSTransition>
      }
    </TransitionGroup>
  </div>
);

export default View;