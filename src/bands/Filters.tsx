import * as React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { definitions, Input } from '../shared';
import store from '../store';
import {
  makeGetBandsAction,
  ISearchRequest,
  makeToggleFiltersAction,
} from './types';

const styles = StyleSheet.create({
  filters: {
    padding: '24px',
    backgroundColor: definitions.colors.white,
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

const Filters = ({ className, name, filtersOpen }: IFiltersProps) => (
  <div className={css(styles.filters) + ' ' + className}>
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
      onChange={(s: string) => store.dispatch(makeGetBandsAction({
        name: s,
        page: 0,
      }))}
      value={name}
      placeHolder="name"
    />
  </div>
);

export default Filters;