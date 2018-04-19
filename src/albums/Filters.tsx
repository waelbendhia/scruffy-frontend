import * as React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { definitions, Input } from '../shared';
import { SortBy } from './types';

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
  }
});

interface FiltersProps {
  className?: string;
  updateName: (_: string) => void;
  value: string;
  ratingLower: number;
  ratingHigher: number;
  updateRatingLower: (_: number) => void;
  updateRatingHigher: (_: number) => void;
  updateSortBy: (_: SortBy) => void;
  yearLower: number;
  yearHigher: number;
  updateYearLower: (_: number) => void;
  updateYearHigher: (_: number) => void;
  includeUnknown: boolean;
  sortBy: SortBy;
  sortOrderAsc: boolean;
  updateSortOrderAsc: (_: boolean) => void;
  updateIncludeUnknown: (_: boolean) => void;
}

const Filters = ({
  updateName,
  className,
  value,
  ratingLower,
  ratingHigher,
  updateRatingLower,
  updateRatingHigher,
  updateSortBy,
  yearLower,
  yearHigher,
  updateYearLower,
  updateYearHigher,
  includeUnknown,
  sortBy,
  sortOrderAsc,
  updateSortOrderAsc,
  updateIncludeUnknown,
}: FiltersProps) => (
    <div
      className={css(styles.filters) + ' ' + className}
    >
      <h1>Search:</h1>
      <Input
        type="text"
        onChange={updateName}
        value={value}
        placeHolder="name"
      />
      <div className={css(styles.subHeading)}>
        Rating
      </div>
      <div className={css(styles.ratingYearContainer)}>
        <Input
          type="number"
          onChange={updateRatingLower}
          value={ratingLower}
          placeHolder="min"
          minValue={0}
          maxValue={ratingHigher}
        />
        <Input
          type="number"
          onChange={updateRatingHigher}
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
          onChange={updateYearLower}
          value={yearLower}
          placeHolder="min"
          minValue={0}
          maxValue={yearHigher}
        />
        <Input
          type="number"
          onChange={updateYearHigher}
          value={yearHigher}
          placeHolder="max"
          minValue={yearLower}
          maxValue={new Date().getFullYear()}
        />
      </div>
      <div>
        <input
          type="checkbox"
          onChange={e => updateIncludeUnknown(e.target.checked)}
          checked={includeUnknown}
        />
        <label className={css(styles.label)}>Include unknown date?</label>
      </div>
      <div className={css(styles.subHeading)}>
        Sort By
      </div>
      <select
        value={SortBy[sortBy]}
        onChange={e => updateSortBy(SortBy[e.target.value])}
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
          onChange={e => updateSortOrderAsc(e.target.checked)}
          checked={sortOrderAsc}
        />
        <label className={css(styles.label)}>Sort ascending</label>
      </div>
    </div >
  );

export default Filters;