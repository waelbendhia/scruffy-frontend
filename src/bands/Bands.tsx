import * as React from 'react';
import { State, makeGetBandsAction } from './types';
import { StyleSheet, css } from 'aphrodite/no-important';
import { definitions, Paginator } from '../shared';
import store from '../store';
import Filters from './Filters';
import BandsGrid from './BandsGrid';

const styles = StyleSheet.create({
  layoutGrid: {
    height: `calc(100vh - ${definitions.headerHeight})`,
    display: 'grid',
    gridTemplateColumns: 'minmax(20%, 200px) 1fr',
    gridTemplateRows: '1fr 60px',
    gridTemplateAreas: `
      "filter grid"
      "filter paginator"
    `,
  },
  filters: {
    gridArea: 'filter',
    zIndex: 1,
  },
  grid: {
    gridArea: 'grid',
    position: 'relative',
  },
  paginator: { gridArea: 'paginator' }
});

const View = ({ bands, count, request }: State) => {
  const maxPage = Math.ceil(count / request.numberOfResults);
  return (
    <div className={css(styles.layoutGrid)}>
      <Filters
        className={css(styles.filters)}
        value={request.name}
        updateName={s => store.dispatch(makeGetBandsAction({
          name: s,
          page: 0,
        }))}
      />
      <BandsGrid
        className={css(styles.grid)}
        bands={bands}
      />
      <Paginator
        className={css(styles.paginator)}
        page={Math.min(request.page, maxPage - 1)}
        maxPage={Math.ceil(count / request.numberOfResults)}
        changePage={(delta) =>
          store.dispatch(makeGetBandsAction({
            page: Math.max(
              Math.min(request.page + delta, maxPage - 1),
              0,
            ),
          }))
        }
      />
    </div>
  );
};

export default View;