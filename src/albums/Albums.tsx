import * as React from 'react';
import { IState, makeGetAlbumsAction, ISearchRequest } from './types';
import { StyleSheet, css } from 'aphrodite/no-important';
import { Paginator, definitions } from '../shared';
import store from '../store';
import Filters from './Filters';
import AlbumsGrid from './AlbumsGrid';
import { bound } from '../shared/types/Other';

function wrap<T>(f: (_: T) => Partial<ISearchRequest>) {
  return (x: T) => store.dispatch(makeGetAlbumsAction(f(x)));
}

const View = ({ count, albums, request, filtersOpen }: IState) => {
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
  const maxPage = Math.ceil(count / request.numberOfResults);
  const bindPage = (d: number) => bound(0, maxPage - 1, request.page + d);

  return (
    <div className={css(styles.layoutGrid)}>
      <Filters
        className={css(styles.filters)}
        {...request}
        filtersOpen={filtersOpen}
      />
      <AlbumsGrid
        changePage={wrap(d => ({ page: bindPage(d) }))}
        className={css(styles.grid)}
        albums={albums}
      />
      <Paginator
        className={css(styles.paginator)}
        page={Math.min(request.page, maxPage - 1)}
        maxPage={maxPage}
        changePage={wrap(d => ({ page: bindPage(d) }))}
      />
    </div>
  );
};

export default View;