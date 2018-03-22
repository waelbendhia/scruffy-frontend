import * as React from 'react';
import { State } from './types';
import BandCard from './BandCard';
import { StyleSheet, css } from 'aphrodite';
import { definitions, styles as sharedStyles } from '../shared';

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
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  },
  filters: {
    backgroundColor: definitions.colors.white,
  },
});

const View = (props: State) => (
  <div className={css(styles.layoutGrid)}>
    <div className={css(styles.filters, sharedStyles.elevation2)} />
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