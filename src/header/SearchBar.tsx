import * as React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { definitions, Input, IBand, IAlbum } from '../shared';
import store from '../store';
import { makeSearchAction, makeToggleSearchAction } from './types';
import { AlbumView } from '../shared';

interface IProps {
  open: boolean;
  search: string;
  bands: IBand[];
  albums: IAlbum[];
}

const SearchBar = ({ open, search, bands, albums }: IProps) => {
  const styles = StyleSheet.create({
    searchView: {
      display: 'flex',
      left: 0,
      position: 'absolute',
      flexDirection: 'column',
      alignItems: 'stretch',
      height: open ? `calc(100vh - ${definitions.headerHeight})` : 0,
      opacity: open ? 1 : 0,
      top: definitions.headerHeight,
      width: '100%',
      backgroundColor: definitions.colors.blackTransparent,
      transition:
        open
          ? `opacity ease-in-out ${definitions.transitions.fast}`
          : (`opacity ease-in-out ${definitions.transitions.fast},` +
            `height 0s linear ${definitions.transitions.fast}`),
      overflow: 'hidden',
    },
    searchBar: {
      paddingLeft: '32px',
      paddingRight: '32px',
      width: 'calc(100% - 64px)',
      height: open ? '70%' : 0,
      backgroundColor: definitions.colors.black,
      transition: `height ease-in-out ${definitions.transitions.fast}`,
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gridTemplateRows: '40px',
      gridGap: '8px',
    },
    searchInput: {
      color: definitions.colors.white,
      gridColumn: 'span 2',
    },
    show: {
      transition: `opacity ease-in-out ${definitions.transitions.fast}`,
    },
    resultGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gridTemplateRows: 'repeat(5, 1fr)',
    },
    hide: { pointerEvents: 'none', opacity: 0 },
    spacer: { flex: 1 },
  });
  return (
    <div className={css(styles.searchView)}>
      <div className={css(styles.searchBar)} >
        <Input
          whiteText={true}
          className={css(styles.searchInput, styles.show, !open && styles.hide)}
          icon="search"
          type="text"
          value={search}
          onChange={(v: string) => store.dispatch(makeSearchAction(v))}
        />
        <div className={css(styles.resultGrid)}>
          {JSON.stringify(bands.map(b => b.name))}
        </div>
        <div className={css(styles.resultGrid)}>
          {albums.map(a =>
            <AlbumView
              key={a.name}
              url={a.band ? a.band.url : ''}
              whiteText={true}
              {...a}
            />
          )}
        </div>
      </div>
      <div
        className={css(styles.spacer)}
        onClick={() => store.dispatch(makeToggleSearchAction())}
      />
    </div>
  );
};

export default SearchBar;