import * as React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { definitions, Input } from '../shared';
import { Link } from 'react-router-dom';
import HeaderLink from './HeaderLink';
import store from '../store';
import { makeToggleSearchAction, IState, makeSearchAction } from './types';

interface IProps {
  location: string;
}

const View = ({ open, search, location, bands, albums }: IProps & IState) => {

  const styles = StyleSheet.create({
    header: {
      position: 'sticky',
      top: 0,
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'row',
      height: definitions.headerHeight,
      backgroundColor: definitions.colors.black,
      color: definitions.colors.white,
      paddingLeft: `calc(${definitions.headerHeight} / 2)`,
      paddingRight: `calc(${definitions.headerHeight} / 2)`,
      zIndex: 5,
    },
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
      height: open ? '50%' : 0,
      backgroundColor: definitions.colors.black,
      transition: `height ease-in-out ${definitions.transitions.fast}`,
    },
    icon: {
      color: definitions.colors.white,
      fontSize: '30px !important',
      transition: `color ease-in ${definitions.transitions.fast}`,
      ':hover': { color: definitions.colors.primary }
    },
    siteTitle: {
      left: '50%',
      position: 'absolute',
      display: 'block',
      height: definitions.headerHeight,
      lineHeight: definitions.headerHeight,
      fontFamily: definitions.fonts.heading,
      fontWeight: 'bold',
      color: definitions.colors.white,
      fontSize: '3em',
      transform: 'translateX(-50%)'
    },
    whiteText: {
      color: definitions.colors.white,
    },
    show: {
      transition: `opacity ease-in-out ${definitions.transitions.fast}`,
    },
    hide: { pointerEvents: 'none', opacity: 0 },
    spacer: { flex: 1 },
  });
  return (
    <div className={css(styles.header)}>
      <Link
        to="/"
        className={css(
          styles.siteTitle,
          (location === '/' || open) && styles.hide)}
      >
        Scaruffi2.0
      </Link>
      <a onClick={() => store.dispatch(makeToggleSearchAction())}>
        <i className={css(styles.icon) + ' material-icons'}>
          {open ? 'close' : 'search'}
        </i>
      </a>
      <div className={css(styles.spacer)} />
      {
        [
          {
            text: 'Music',
            link: '/bands',
            options: [
              { text: 'Bands', link: '/bands' },
              { text: 'Albums', link: '/albums' },
            ],
          },
          {
            text: 'Film',
            link: '/films',
            options: [
              { text: 'Directors', link: '/directors' },
              { text: 'Films', link: '/films' },
            ],
          },
        ]
          .map(x => (
            <div className={css(styles.show, open && styles.hide)} key={x.text}>
              <HeaderLink {...x} location={location.substr(1)} />
            </div>
          ))
      }
      <div className={css(styles.searchView)}>
        <div className={css(styles.searchBar)} >
          <Input
            whiteText={true}
            className={css(styles.whiteText, styles.show, !open && styles.hide)}
            icon="search"
            type="text"
            value={search}
            onChange={(v: string) => store.dispatch(makeSearchAction(v))}
          />
          {JSON.stringify(bands.map(b => b.name))}
          {JSON.stringify(albums.map(a => a.name))}
        </div>
        <div
          className={css(styles.spacer)}
          onClick={() => store.dispatch(makeToggleSearchAction())}
        />
      </div>
    </div>
  );
};

export default View;