import * as React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { definitions } from '../shared';
import { Link } from 'react-router-dom';
import HeaderLink from './HeaderLink';
import store from '../store';
import { makeToggleSearchAction, IState } from './types';
import SearchBar from './SearchBar';

interface IProps {
  location: string;
}

const View = (props: IProps & IState) => {
  const { location, open } = props;
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
          .map(x =>
            <div className={css(styles.show, open && styles.hide)} key={x.text}>
              <HeaderLink {...x} location={location.substr(1)} />
            </div>
          )
      }
      <SearchBar {...props} />
    </div>
  );
};

export default View;