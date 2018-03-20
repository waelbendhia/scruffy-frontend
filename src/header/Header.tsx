import * as React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { definitions, styles as sharedStyles } from '../shared';
import { Link } from 'react-router-dom';
import HeaderLink from './HeaderLink';

export const styles = StyleSheet.create({
  header: {
    position: 'sticky',
    top: 0,
    display: 'flex',
    flexDirection: 'row',
    height: definitions.headerHeight,
    backgroundColor: definitions.colors.black,
    color: definitions.colors.white,
    paddingLeft: `calc(${definitions.headerHeight} / 2)`,
    paddingRight: `calc(${definitions.headerHeight} / 2)`,
    zIndex: 5,
  },
  siteTitle: {
    display: 'block',
    float: 'left',
    height: definitions.headerHeight,
    lineHeight: definitions.headerHeight,
    fontFamily: definitions.fonts.heading,
    fontWeight: 'bold',
    color: definitions.colors.white,
    fontSize: '3em',
  },
  spacer: {
    flex: 1,
  },
});

export default ({ location }: { location: string }) => (
  <div className={css(styles.header, sharedStyles.elevation3)}>
    <Link to="/" className={css(styles.siteTitle)}>Scaruffi2.0</Link>
    <div className={css(styles.spacer)} />
    <HeaderLink
      text="Music"
      link="bands"
      location={location.substr(1)}
      options={[
        { text: 'Bands', link: 'bands' },
        { text: 'Albums', link: 'albums' },
      ]}
    />
    <HeaderLink
      text="Film"
      link="films"
      location={location.substr(1)}
      options={[
        { text: 'Directors', link: 'directors' },
        { text: 'Films', link: 'films' },
      ]}
    />
  </div>
);