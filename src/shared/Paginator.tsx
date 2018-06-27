import * as React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { definitions } from '.';
import { IState } from '../store';
import { Action, makeGetBandsAction } from '../bands/types';
import { Dispatch, connect, Omit } from 'react-redux';
import { bound } from './types/Other';
import { makeGetAlbumsAction } from '../albums/types';

const styles = StyleSheet.create({
  paginator: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    userSelect: 'none',
    borderTop: `1px solid ${definitions.colors.black}`,
    width: '90%',
    marginLeft: '5%',
    gridArea: 'paginator',
  },
  pageIndicator: {
    width: '200px',
    textAlign: 'center',
  },
  clickers: {
    marginRight: '10px',
    marginLeft: '10px',
    fontSize: '28px',
  },
  inactive: { pointerEvents: 'none' }
});

interface IOwnProps {
  selector: 'bands' | 'albums';
}

interface IStateProps {
  page: number;
  maxPage: number;
}

const mapStateToProps = (state: IState, ownProps: IOwnProps): IStateProps => {
  const selected = state[ownProps.selector];
  const maxPage = Math.ceil(selected.count / selected.request.numberOfResults);

  return {
    page: Math.min(selected.request.page, maxPage - 1),
    maxPage: maxPage,
  };
};

interface IDispatchProps {
  changePage: (maxPage: number, page: number) => (delta: number) => void;
}

const mapDispatchToProps = (dispath: Dispatch<Action>, ownProps: IOwnProps) => {
  const creator = ownProps.selector === 'albums'
    ? makeGetAlbumsAction
    : makeGetBandsAction;

  return {
    changePage: (maxPage: number, page: number) => (delta: number) =>
      dispath(creator({
        page: bound(0, maxPage - 1, page + delta),
      })),
  };
};

interface IMergedProps extends IStateProps, Omit<IDispatchProps, 'changePage'> {
  changePage: (delta: number) => void;
}

const View =
  ({ page, maxPage, changePage }: IMergedProps & IOwnProps) => {
    const Clicker = ({ value }: { value: number }) => (
      <a
        className={css(
          styles.clickers,
          (value < 0 && page === 0 || value > 0 && page + 1 === maxPage)
            ? styles.inactive
            : null,
        )}
        onClick={() => changePage(value)}
      >
        {value < 0 ? `${Math.abs(value)}<` : `>${value}`}
      </a>
    );
    return (
      <div className={css(styles.paginator)}>
        <Clicker value={-10} />
        <Clicker value={-1} />
        <h1 className={css(styles.pageIndicator)}>{page + 1}/{maxPage}</h1>
        <Clicker value={1} />
        <Clicker value={10} />
      </div>
    );
  };

export default connect<IStateProps, IDispatchProps, IOwnProps, IMergedProps>(
  mapStateToProps,
  mapDispatchToProps,
  (stateProps, dispatchProps, ownProps) => {
    const { changePage, ...rest } = dispatchProps;
    return {
      ...stateProps,
      ...rest,
      changePage: dispatchProps.changePage(stateProps.maxPage, stateProps.page)
    };
  }
)(View);