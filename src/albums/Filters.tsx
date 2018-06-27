import * as React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { definitions, Input } from '../shared';
import {
  SortBy,
  ISearchRequest,
  makeGetAlbumsAction,
  makeToggleFiltersAction,
  Action,
} from './types';
import { IState } from '../store';
import { bound } from '../shared/types/Other';
import { Dispatch, connect } from 'react-redux';
import { Omit } from 'react-router';

interface IStateProps extends ISearchRequest {
  filtersOpen: boolean;
}

const mapStateToProps = ({ albums }: IState): IStateProps => ({
  filtersOpen: albums.filtersOpen,
  ...albums.request,
});

interface IDispatchProps {
  toggleFilters: () => void;
  setName: (_: string) => void;
  setRatingLower: (_: number) => (r: number) => void;
  setRatingHigher: (_: number) => void;
  setYearLower: (_: number) => void;
  setYearHigher: (_: number) => void;
  setIncludeUnknown: (_: boolean) => void;
  setSortBy: (_: SortBy) => void;
  setSortOrderAsc: (_: boolean) => void;
}

const mapDispatchToProps = (dispatch: Dispatch<Action>): IDispatchProps => ({
  toggleFilters: () => dispatch(makeToggleFiltersAction()),
  setName: (name: string) => dispatch(makeGetAlbumsAction({ name, page: 0 })),
  setRatingLower: (ratingHigher: number) => (r: number) =>
    dispatch(makeGetAlbumsAction({
      ratingLower: bound(0, ratingHigher, r),
      page: 0,
    })),
  setRatingHigher: (r: number) =>
    dispatch(makeGetAlbumsAction({ ratingHigher: r, page: 0 })),
  setYearLower: (y: number) =>
    dispatch(makeGetAlbumsAction({ yearLower: y, page: 0 })),
  setYearHigher: (y: number) =>
    dispatch(makeGetAlbumsAction({ yearHigher: y, page: 0 })),
  setIncludeUnknown: (inc: boolean) =>
    dispatch(makeGetAlbumsAction({ includeUnknown: inc, page: 0 })),
  setSortBy: (s: SortBy) =>
    dispatch(makeGetAlbumsAction({ sortBy: s, page: 0 })),
  setSortOrderAsc: (asc: boolean) =>
    dispatch(makeGetAlbumsAction({ sortOrderAsc: asc, page: 0 })),
});

interface IMergedProps extends
  IStateProps, Omit<IDispatchProps, 'setRatingLower'> {
  setRatingLower: (r: number) => void;
}

const View = (props: IMergedProps) => {
  const styles = StyleSheet.create({
    filters: {
      padding: '24px',
      backgroundColor: definitions.colors.white,
      gridArea: 'filter',
      zIndex: 1,
      '@media (max-width: 860px)': {
        position: 'absolute',
        height: '100%',
        transform: `translateX(${props.filtersOpen ? '0' : '100%'})`,
        width: `calc(100% - 112px)`,
        right: 0,
        transition: `transform ease-in ${definitions.transitions.fast}`,
      },
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

  return (
    <div className={css(styles.filters)}>
      <a className={css(styles.toggle)} onClick={props.toggleFilters} >
        <i className={css(styles.icon) + ' material-icons'}>
          {props.filtersOpen ? 'close' : 'filter_list'}
        </i>
      </a>
      <h1>Search:</h1>
      <Input
        type='text'
        onChange={props.setName}
        value={name}
        placeHolder='name'
      />
      <div className={css(styles.subHeading)}>
        Rating
      </div>
      <div className={css(styles.ratingYearContainer)}>
        <Input
          type='number'
          onChange={props.setRatingHigher}
          value={props.ratingLower}
          placeHolder='min'
          minValue={0}
          maxValue={props.ratingHigher}
        />
        <Input
          type='number'
          onChange={props.setRatingHigher}
          value={props.ratingHigher}
          placeHolder='max'
          minValue={props.ratingLower}
          maxValue={10}
        />
      </div>
      <div className={css(styles.subHeading)}>
        Year
      </div>
      <div className={css(styles.ratingYearContainer)}>
        <Input
          type='number'
          onChange={props.setYearLower}
          value={props.yearLower}
          placeHolder='min'
          minValue={0}
          maxValue={props.yearHigher}
        />
        <Input
          type='number'
          onChange={props.setYearHigher}
          value={props.yearHigher}
          placeHolder='max'
          minValue={props.yearLower}
          maxValue={new Date().getFullYear()}
        />
      </div>
      <div>
        <input
          type='checkbox'
          onChange={e => props.setIncludeUnknown(e.target.checked)}
          checked={props.includeUnknown}
        />
        <label className={css(styles.label)}>Include unknown date?</label>
      </div>
      <div className={css(styles.subHeading)}>
        Sort By
      </div>
      <select
        value={SortBy[props.sortBy]}
        onChange={e => props.setSortBy(SortBy[e.target.value])}
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
          type='checkbox'
          onChange={e => props.setSortOrderAsc(e.target.checked)}
          checked={props.sortOrderAsc}
        />
        <label className={css(styles.label)}>Sort ascending</label>
      </div>
    </div >
  );
};

export default connect<IStateProps, IDispatchProps, {}, IMergedProps>(
  mapStateToProps,
  mapDispatchToProps,
  (stateProps, dispatchProps) => ({
    ...stateProps,
    ...dispatchProps,
    setRatingLower: dispatchProps.setRatingLower(stateProps.yearHigher),
  })
)(View);