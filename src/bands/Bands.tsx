import * as React from 'react';
import { State, makeGetBandsAction } from './types';
import BandCard from './BandCard';
import { StyleSheet, css } from 'aphrodite';
import { definitions, styles as sharedStyles } from '../shared';
import store from '../store';

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
});

const View = (props: State) => (
  <div className={css(styles.layoutGrid)}>
    <div className={css(styles.filters, sharedStyles.elevation2)} >
      Here be filters
      <input
        type="text"
        onChange={
          e =>
            store.dispatch(makeGetBandsAction({ name: e.target.value }))
        }
      />
    </div>
    <div className={css(styles.bandGrid)}>
      {
        props.bands.failed
          ? JSON.stringify(props.bands.error)
          : props.bands.loading
            ? 'Loading'
            : props.bands.data.map(b => <BandCard key={b.url} {...b} />)
      }
    </div>
  </div>
);

export default View;