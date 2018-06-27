import * as React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { definitions, Input } from '../shared';
import store, { IState } from '../store';
import { makeGetBandsAction, makeToggleFiltersAction } from './types';
import { connect } from 'react-redux';

interface IStateProps {
  filtersOpen: boolean;
  name: string;
}

const mapStateToProps = ({ bands }: IState): IStateProps => ({
  filtersOpen: bands.filtersOpen,
  name: bands.request.name,
});

const View = ({ name, filtersOpen }: IStateProps) => {
  const styles = StyleSheet.create({
    filters: {
      padding: '24px',
      backgroundColor: definitions.colors.white,
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
        type='text'
        onChange={(s: string) => store.dispatch(makeGetBandsAction({
          name: s,
          page: 0,
        }))}
        value={name}
        placeHolder='name'
      />
    </div>
  );
};

export default connect(mapStateToProps)(View);