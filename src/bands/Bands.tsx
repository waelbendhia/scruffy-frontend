import * as React from 'react';
import { IState, makeGetBandsAction } from './types';
import { StyleSheet, css } from 'aphrodite/no-important';
import { definitions, Paginator } from '../shared';
import store from '../store';
import Filters from './Filters';
import BandsGrid from './BandsGrid';

const View = ({ bands, count, request, filtersOpen }: IState) => {
  const maxPage = Math.ceil(count / request.numberOfResults);
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
      '@media (max-width: 860px)': {
        position: 'relative',
        overflow: 'hidden',
        gridTemplateAreas: `
        "grid"
        "paginator"
      `,
        gridTemplateColumns: '100%',
      },
    },
    filters: {
      gridArea: 'filter',
      zIndex: 1,
      '@media (max-width: 860px)': {
        position: 'absolute',
        height: '100%',
        transform: `translateX(${filtersOpen ? '0' : '100%'})`,
        width: `calc(100% - 112px)`,
        right: 0,
        transition: `transform ease-in ${definitions.transitions.fast}`,
      },
    },
    grid: {
      gridArea: 'grid',
      position: 'relative',
    },
    paginator: { gridArea: 'paginator' }
  });

  return (
    <div className={css(styles.layoutGrid)}    >
      <Filters
        className={css(styles.filters)}
        {...request}
        filtersOpen={filtersOpen}
      />
      <BandsGrid
        className={css(styles.grid)}
        bands={bands}
        changePage={delta =>
          store.dispatch(makeGetBandsAction({
            page: Math.max(
              Math.min(request.page + delta, maxPage - 1),
              0,
            ),
          }))
        }
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