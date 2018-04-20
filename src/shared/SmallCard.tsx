import * as React from 'react';
import { definitions, styles as sharedStyles } from '../shared';
import { StyleSheet, css } from 'aphrodite/no-important';
import { Link, LinkProps } from 'react-router-dom';

const styles = StyleSheet.create({
  card: {
    position: 'relative',
    backgroundColor: definitions.colors.darkGrey,
    ':hover > span': {
      left: 0,
      width: '100%',
    },
  },
  label: {
    position: 'absolute',
    width: '100%',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    backgroundColor: definitions.colors.whiteTransparent,
    textAlign: 'center',
    fontSize: '24px',
    bottom: 0,
  },
  cell: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
  highlight: {
    position: 'absolute',
    left: '50%',
    bottom: 0,
    width: 0,
    height: '2px',
    backgroundColor: definitions.colors.primary,
    transition: `width ease-out ${definitions.transitions.fast}, 
               left ease-out ${definitions.transitions.fast}`,
  },
  noHover: {
    pointerEvents: 'none',
  }
});

interface IProps {
  bgUrl: string;
  url?: string;
  children: React.ReactNode;
}

const SmallCard = ({ bgUrl, url, children }: IProps) => {
  const bg = StyleSheet.create({
    bg: {
      backgroundImage: `url(${bgUrl})`,
    }
  }),
    Elem = (props: Partial<LinkProps>) =>
      !!url
        ? <Link {...props} to={`/bands/${url.split('.')[0]}`} />
        : <span {...props} />;

  return (
    <Elem
      className={css(
        styles.card,
        sharedStyles.elevate,
        !url && styles.noHover,
      )}
    >
      <div className={css(styles.cell, bg.bg)} />
      <div className={css(styles.label)}>{children}</div>
      <span className={css(styles.highlight)} />
    </Elem>
  );
};

export default SmallCard;