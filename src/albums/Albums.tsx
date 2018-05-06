import * as React from 'react';
import { IState, makeGetAlbumsAction, ISearchRequest } from './types';
import { StyleSheet, css } from 'aphrodite/no-important';
import { Paginator, definitions } from '../shared';
import store from '../store';
import Filters from './Filters';
import AlbumsGrid from './AlbumsGrid';

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

function wrap<T>(f: (_: T) => Partial<ISearchRequest>) {
  return (x: T) => store.dispatch(makeGetAlbumsAction(f(x)));
}

const bound = (min: number, max: number, val: number) =>
  Math.max(Math.min(val, max), min);

const View = ({ count, albums, request }: IState) => {
  const maxPage = Math.ceil(count / request.numberOfResults);
  const bindPage = (d: number) => bound(0, maxPage - 1, request.page + d);

  return (
    <div className={css(styles.layoutGrid)}>
      <Filters
        className={css(styles.filters)}
        updateName={wrap(s => ({ name: s, page: 0 }))}
        updateRatingLower={wrap(
          r => ({ ratingLower: bound(0, request.ratingHigher, r) })
        )}
        updateRatingHigher={wrap(s => ({ ratingHigher: s, page: 0 }))}
        updateYearLower={wrap(r => ({ yearLower: r, page: 0 }))}
        updateYearHigher={wrap(s => ({ yearHigher: s, page: 0 }))}
        updateIncludeUnknown={wrap(s => ({ includeUnknown: s, page: 0 }))}
        updateSortBy={wrap(s => ({ sortBy: s }))}
        updateSortOrderAsc={wrap(s => ({ sortOrderAsc: s }))}
        {...request}
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