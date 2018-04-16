import * as React from 'react';
import {
  Band,
  SmallCard,
  styles as sharedStyles,
  definitions,
  Album,
} from '../shared';
import { StyleSheet, css } from 'aphrodite/no-important';

const defaultImage = require('../albums/albumDefault.svg') as string;
const defaultBandImage = require('../bands/bandDefault.svg') as string;

const styles = StyleSheet.create({
  header: {
    position: 'sticky',
    top: `calc(-30vh + 80px + ${definitions.headerHeight})`,
    width: '80%',
    height: '30vh',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundColor: definitions.colors.darkGrey,
    zIndex: 1,
  },
  headerBand: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: '100%',
    height: '80px',
    backgroundColor: definitions.colors.whiteTransparent,
  },
  headerTitle: {
    color: definitions.colors.black,
    position: 'absolute',
    height: '80px',
    lineHeight: '80px',
    fontSize: '44px',
    left: '10%',
    fontWeight: 700,
    bottom: 0,
    display: 'block',
    fontFamily: definitions.fonts.heading,
  },
  bottomLink: { fontSize: '20px' },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  bio: {
    maxWidth: '740px',
  },
  bioParagraph: {
    fontWeight: 300,
    fontSize: '21px',
    lineHeight: '31px',
    marginTop: '38px',
  },
  body: {
    display: 'flex',
    flexDirection: 'row',
    maxWidth: 'calc(80% - 48px)',
    paddingLeft: '24px',
    paddingRight: '24px',
  },
  albums: {
    maxHeight: '1000vh',
    marginLeft: '80px',
    display: 'grid',
    maxWidth: '300px',
    minWidth: '180px',
    gridTemplateColumns: 'minmax(200px, 400px)',
    gridTemplateRows: '80px repeat(auto-fit, 240px)',
    gridColumnGap: '16px',
    gridRowGap: '16px',
    flexGrow: 1,
  },
  album: {
    fontSize: '0.7em',
    fontWeight: 700,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  date: { fontSize: '0.6em' },
});

const Band = ({ name, bio, albums, fullUrl, imageUrl }: Band) => (
  <div className={css(styles.container)}>
    <div
      className={css(
        styles.header,
        sharedStyles.elevation2,
        StyleSheet.create({
          bg: { backgroundImage: `url(${imageUrl || defaultBandImage})` }
        }).bg
      )}
    >
      <span className={css(styles.headerBand)} />
      <span className={css(styles.headerTitle)}>
        {name}
      </span>
    </div>
    <div className={css(styles.body)}>
      <Bio bio={bio} fullUrl={fullUrl} albums={albums || []} />
      <Albums albums={albums || []} />
    </div>
  </div>
);

const Bio = (
  { bio, fullUrl, albums }
    : {
      bio: string;
      fullUrl: string;
      albums: Album[];
    }
) => (
    <div className={css(styles.bio)}>
      {
        bio
          .split('\n')
          .filter(t => t !== '')
          .map(
            (text, i) => (
              <p key={i} className={css(styles.bioParagraph)}>
                {text}
              </p>
            )
          )
      }
      <a className={css(styles.bottomLink)} href={fullUrl} target="_blank">
        Read on Scaruffi.com
    </a>
    </div>
  );

const Albums = ({ albums }:
  { albums: Album[] }) => (
    <div className={css(styles.albums)}>
      <h1>Albums</h1>
      {
        albums
          .map(a => (
            <SmallCard
              key={(a.band ? a.band.url : '') + a.name}
              bgUrl={a.imageUrl || defaultImage}
            >
              <div className={css(styles.album)}>{a.name}</div>
              <div className={css(styles.date)}>({a.year || 'NA'}) </div>
              <div>{a.rating}/10</div>
            </SmallCard>
          ))
      }
    </div>
  );

export default Band;