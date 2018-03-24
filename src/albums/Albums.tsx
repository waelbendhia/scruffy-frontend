import * as React from 'react';
import { State, makeGetAlbumsAction } from './types';
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

const View = ({ count, albums, request }: State) => {
  const maxPage = Math.ceil(count / request.numberOfResults);
  return (
    <div className={css(styles.layoutGrid)}>
      <Filters
        className={css(styles.filters)}
        value={request.name}
        updateName={s => store.dispatch(makeGetAlbumsAction({
          name: s,
          page: 0,
        }))}
        updateRatingLower={r => store.dispatch(makeGetAlbumsAction({
          ratingLower: Math.min(Math.max(r, 0), request.ratingHigher),
          page: 0,
        }))}
        updateRatingHigher={s => store.dispatch(makeGetAlbumsAction({
          ratingHigher: Math.max(Math.min(s, 10), request.ratingLower),
          page: 0,
        }))}
        updateYearLower={r => store.dispatch(makeGetAlbumsAction({
          yearLower: Math.min(Math.max(r, 0), request.yearHigher),
          page: 0,
        }))}
        updateYearHigher={s => store.dispatch(makeGetAlbumsAction({
          yearHigher: Math.max(
            Math.min(s, new Date().getFullYear()),
            request.yearLower,
          ),
          page: 0,
        }))}
        updateIncludeUnknown={s => store.dispatch(makeGetAlbumsAction({
          includeUnknown: s,
          page: 0,
        }))}
        {...request}
      />
      <AlbumsGrid className={css(styles.grid)} albums={albums} />
      <Paginator
        className={css(styles.paginator)}
        page={Math.min(request.page, maxPage - 1)}
        maxPage={Math.ceil(count / request.numberOfResults)}
        changePage={(delta) =>
          store.dispatch(makeGetAlbumsAction({
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