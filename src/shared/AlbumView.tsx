import * as React from 'react';
import { definitions, IAlbum } from '../shared';
import { StyleSheet, css } from 'aphrodite/no-important';
import { Link, LinkProps } from 'react-router-dom';

const defaultImage = require('../albums/albumDefault.svg') as string;
const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: 0,
    paddingTop: '40%',
    position: 'relative',
    backgroundColor: definitions.colors.white,
    ':hover > span': {
      left: 0,
      width: '100%',
    },
  },
  label: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: '40%',
    width: '60%',
    height: '100%',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    fontSize: '24px',
    bottom: 0,
  },
  ellipsis: {
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  border: {
    height: '70%',
    width: '1px',
    marginLeft: '12px',
    marginRight: '16px',
    backgroundColor: definitions.colors.black,
  },
  labelText: {
    height: '90%',
    display: 'flex',
    maxWidth: 'calc(100% - 37px)',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  albumName: {
    fontSize: '0.7em',
    whiteSpace: 'normal',
    fontWeight: 700,
  },
  date: { fontSize: '0.6em' },
  cell: {
    top: '8px',
    left: '8px',
    backgroundColor: definitions.colors.darkGrey,
    position: 'absolute',
    width: 'calc(40% - 16px)',
    height: 'calc(100% - 16px)',
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

interface IProps extends IAlbum {
  url?: string;
}

const AlbumView = ({ url, imageUrl, name, year, rating }: IProps) => {
  const bg = StyleSheet.create({
    bg: {
      backgroundImage: `url(${imageUrl || defaultImage})`,
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
        !url && styles.noHover,
      )}
    >
      <div className={css(styles.cell, bg.bg)} />
      <div className={css(styles.label)}>
        <div className={css(styles.border)} />
        <div className={css(styles.labelText)}>
          <div className={css(styles.albumName)}>{name}</div>
          <div className={css(styles.ellipsis, styles.date)} >
            ({year || 'NA'})
          </div>
          <div className={css(styles.ellipsis)} >{rating}/10</div>
        </div>
      </div>
      <span className={css(styles.highlight)} />
    </Elem>
  );
};

export default AlbumView;