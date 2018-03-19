import * as React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { definitions, styles as sharedStyles } from '../shared';

const styles = StyleSheet.create({
  header: {
    position: 'relative',
    // width: `calc(100% - ${definitions.headerHeight})`,
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
  linkStyle: {
    position: 'relative',
    height: definitions.headerHeight,
    width: '120px',
    marginRight: '16px',
  },
  expandChild: {
    ':hover > *': {
      height: `calc(2 * ${definitions.headerHeight})`,
    }
  },
  spacer: {
    flex: 1,
  },
  linkChildStyle: {
    display: 'block',
    width: '100%',
    height: definitions.headerHeight,
    fontSize: '2em',
    textAlign: 'center',
    lineHeight: `calc(${definitions.headerHeight} * 1.2)`,
  },
  expanderChild: {
    fontSize: '1.4em',
    lineHeight: definitions.headerHeight,
  },
  expander: {
    position: 'absolute',
    height: 0,
    top: definitions.headerHeight,
    width: '100%',
    backgroundColor: definitions.colors.superDarkGrey,
    zIndex: 5,
    overflow: 'hidden',
    transition: `height ease-in-out ${definitions.transitions.fast}`,
  },
});

interface HeaderLink {
  text: string;
  link: string;
}

const Link =
  ({ text, link, options }: HeaderLink & { options: HeaderLink[] }) => (
    <div className={css(styles.linkStyle, styles.expandChild)}>
      <a className={css(styles.linkChildStyle)} href={link}>{text}</a>
      <div className={css(styles.expander, sharedStyles.elevation3)}>
        {options.map(
          o => (
            <a
              className={css(styles.linkChildStyle, styles.expanderChild)}
              href={o.link}
            >
              {o.text}
            </a>
          )
        )}
      </div>
    </div>
  );

export default () => (
  <div className={css(styles.header, sharedStyles.elevation3)}>
    <a href="#/" className={css(styles.siteTitle)}>Scaruffi2.0</a>
    <div className={css(styles.spacer)} />
    <Link
      text="Film"
      link="#films"
      options={[
        { text: 'Directors', link: '#directors"' },
        { text: 'Films', link: '#films"' },
      ]}
    />
    <Link
      text="Music"
      link="#bands"
      options={[
        { text: 'Bands', link: '#bands' },
        { text: 'Albums', link: '#albums' },
      ]}
    />
  </div>
);