import * as React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { definitions, Input } from '../shared';
import {
  SortBy,
  ISearchRequest,
  makeGetAlbumsAction,
  makeToggleFiltersAction,
} from './types';
import store from '../store';
import { bound } from '../shared/types/Other';

const styles = StyleSheet.create({
  filters: {
    padding: '24px',
    backgroundColor: definitions.colors.white,
  },
  subHeading: {
    marginTop: '24px',
    fontSize: '30px',
    color: '#747474',
  },
  ratingYearContainer: {
    display: 'grid',
    gridColumnGap: '8px',
    gridTemplateColumns: 'repeat(2, 1fr)'
  },
  label: {
    fontSize: '24px',
    color: '#747474',
  },
  icon: {
    fontSize: '30px !important',
    transition: `color ease-in ${definitions.transitions.fast}`,
    ':hover': { color: definitions.colors.primary }
  },
  toggle: {
    height: '30px',
    position: 'absolute',
    left: '-46px',
    padding: '8px',
    top: '8px',
    background: 'inherit',
    borderTopLeftRadius: '8px',
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: '8px',
  },
});
interface IFiltersProps extends ISearchRequest {
  className?: string;
  filtersOpen: boolean;
}

function wrap<T>(f: (_: T) => Partial<ISearchRequest>) {
  return (x: T) => store.dispatch(makeGetAlbumsAction(f(x)));
}

const Filters = ({
  className,
  name,
  ratingLower,
  ratingHigher,
  yearLower,
  yearHigher,
  includeUnknown,
  sortBy,
  sortOrderAsc,
  filtersOpen,
}: IFiltersProps) =>
  (
    <div
      className={`${css(styles.filters)} ${className}`}
    >
      <a
        className={css(styles.toggle)}
        onClick={() => store.dispatch(makeToggleFiltersAction())}
      >
        <i className={css(styles.icon) + ' material-icons'}>
          {filtersOpen ? 'close' : 'filter_list'}
        </i>
      </a>
      <h1>Search:</h1>
      <Input
        type="text"
        onChange={wrap((s: string) => ({ name: s, page: 0 }))}
        value={name}
        placeHolder="name"
      />
      <div className={css(styles.subHeading)}>
        Rating
      </div>
      <div className={css(styles.ratingYearContainer)}>
        <Input
          type="number"
          onChange={wrap(
            (r: number) => ({ ratingLower: bound(0, ratingHigher, r) })
          )}
          value={ratingLower}
          placeHolder="min"
          minValue={0}
          maxValue={ratingHigher}
        />
        <Input
          type="number"
          onChange={wrap((s: number) => ({ ratingHigher: s, page: 0 }))}
          value={ratingHigher}
          placeHolder="max"
          minValue={ratingLower}
          maxValue={10}
        />
      </div>
      <div className={css(styles.subHeading)}>
        Year
      </div>
      <div className={css(styles.ratingYearContainer)}>
        <Input
          type="number"
          onChange={wrap((r: number) => ({ yearLower: r, page: 0 }))}
          value={yearLower}
          placeHolder="min"
          minValue={0}
          maxValue={yearHigher}
        />
        <Input
          type="number"
          onChange={wrap((s: number) => ({ yearHigher: s, page: 0 }))}
          value={yearHigher}
          placeHolder="max"
          minValue={yearLower}
          maxValue={new Date().getFullYear()}
        />
      </div>
      <div>
        <input
          type="checkbox"
          onChange={wrap(e => ({ includeUnknown: e.target.checked, page: 0 }))}
          checked={includeUnknown}
        />
        <label className={css(styles.label)}>Include unknown date?</label>
      </div>
      <div className={css(styles.subHeading)}>
        Sort By
      </div>
      <select
        value={SortBy[sortBy]}
        onChange={wrap(e => ({ sortBy: SortBy[e.target.value] }))}
      >
        {
          Object.keys(SortBy)
            .map(s =>
              <option value={s} key={s}>
                {
                  s.toLowerCase()
                    .split('_')
                    .map(s1 => s1.charAt(0).toUpperCase() + s1.slice(1))
                    .join(' ')
                }
              </option>
            )
        }
      </select>
      <div>
        <input
          type="checkbox"
          onChange={wrap(e => ({ sortOrderAsc: e.target.checked }))}
          checked={sortOrderAsc}
        />
        <label className={css(styles.label)}>Sort ascending</label>
      </div>
    </div >
  );

export default Filters;