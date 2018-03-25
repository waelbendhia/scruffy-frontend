import * as React from 'react';
import {
  Band,
  SmallCard,
  styles as sharedStyles,
  definitions,
} from '../shared';
import { StyleSheet, css } from 'aphrodite/no-important';

const defaultImage = require('../albums/albumDefault.svg') as string;
const defaultBandImage = require('../bands/bandDefault.svg') as string;

const styles = StyleSheet.create({
  header: {
    position: 'sticky',
    top: `calc(-30vh + 90px + ${definitions.headerHeight})`,
    borderRadius: '2px',
    width: '100%',
    height: '30vh',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundColor: definitions.colors.darkGrey,
    zIndex: 1,
  },
  headerTitle: {
    color: definitions.colors.black,
    position: 'absolute',
    width: '90%',
    height: '90px',
    lineHeight: '90px',
    fontSize: '50px',
    paddingLeft: '10%',
    fontWeight: 700,
    bottom: '0',
    display: 'block',
    backgroundColor: definitions.colors.whiteTransparent,
    fontFamily: definitions.fonts.heading,
  },
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
  },
  albums: {
    maxHeight: '1000vh',
    marginLeft: '80px',
    marginRight: '4vw',
    display: 'grid',
    maxWidth: '300px',
    minWidth: '150px',
    gridTemplateColumns: 'minmax(200px, 400px)',
    gridTemplateRows: '80px repeat(auto-fit, 120px)',
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
      <a className={css(styles.headerTitle)} href={fullUrl} target="_blank">
        {name}
      </a>
    </div>
    <div className={css(styles.body)}>
      <div className={css(styles.bio)}>
        {
          (bio || '')
            .split('\n')
            .filter(t => t !== '')
            .map(
              (text, i) => (
                <p
                  key={i}
                  className={css(styles.bioParagraph)}
                >
                  {text}
                </p>
              )
            )
        }
      </div>
      <div className={css(styles.albums)}>
        <h1>Albums</h1>
        {(albums || []).map(a => (
          <SmallCard
            hover={false}
            key={(a.band ? a.band.url : '') + a.name}
            bgUrl={a.imageUrl || defaultImage}
            url={a.band ? a.band.url : ''}
          >
            <div className={css(styles.album)}>
              {a.name}
            </div>
            <div className={css(styles.date)}>
              ({a.year !== 0 ? a.year : 'NA'})
            </div>
            <div>{a.rating}/10</div>
          </SmallCard>
        ))}
      </div>
    </div>
  </div>
);

export default Band;