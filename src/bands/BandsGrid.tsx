import * as React from 'react';
import {
  SmallCard,
  IBand,
  ILoadable,
  Grid,
} from '../shared';
import { StyleSheet, css } from 'aphrodite/no-important';
import { IState } from '../store';
import { Dispatch } from 'redux';
import { Action, makeGetBandsAction } from './types';
import { bound } from '../shared/types/Other';
import { connect } from 'react-redux';

const styles = StyleSheet.create({
  grid: {
    gridArea: 'grid',
    position: 'relative',
  },
});

const defaultImage = require('./bandDefault.svg') as string;

interface IStateProps {
  bands: ILoadable<IBand[]>;
  maxPage: number;
  page: number;
}

const mapStateToProps = ({ bands }: IState): IStateProps => ({
  bands: bands.bands,
  maxPage: Math.ceil(bands.count / bands.request.numberOfResults),
  page: bands.request.page,
});

interface IDispatchProps {
  changePage: (maxPage: number, page: number) => (delta: number) => void;
}

const mapDispatchToProps =
  (dispath: Dispatch<Action>) => ({
    changePage: (maxPage: number, page: number) =>
      (delta: number) => dispath(makeGetBandsAction({
        page: bound(0, maxPage - 1, page + delta)
      }))
  });

interface IMergedProps extends IStateProps {
  changePage: (delta: number) => void;
}

const View = (props: IMergedProps) => (
  <Grid
    className={css(styles.grid)}
    {...props}
    data={props.bands}
    minRows={2}
    cell={b =>
      <SmallCard key={b.url} bgUrl={b.imageUrl || defaultImage} {...b}>
        {b.name}
      </SmallCard>}
  />
);

export default connect<IStateProps, IDispatchProps, {}, IMergedProps>(
  mapStateToProps,
  mapDispatchToProps,
  (stateProps, dispatchProps) => ({
    ...stateProps,
    ...dispatchProps,
    changePage: dispatchProps.changePage(stateProps.maxPage, stateProps.page),
  })
)(View);