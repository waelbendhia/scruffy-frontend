import * as React from 'react';
import { State } from './types';
import BandCard from './BandCard';
import { StyleSheet, css } from 'aphrodite';
import { definitions } from '../shared';

const styles = StyleSheet.create({
  grid: {
    height: `calc(100vh - ${definitions.headerHeight} - 32px)`,
    display: 'grid',
    gridGap: '16px',
    padding: '16px',
    gridTemplateColumns: 'repeat(4, 1fr)',
  }
});

const View = (props: State) => (
  <div className={css(styles.grid)}>
    {
      props.bands.failed
        ? JSON.stringify(props.bands.error)
        : props.bands.loading
          ? 'Loading'
          : props.bands.data.map(b => <BandCard key={b.url} {...b} />)
    }
  </div>
);

export default View;