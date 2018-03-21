import * as React from 'react';
import { Band, definitions, styles as sharedStyles } from '../shared';
import { StyleSheet, css } from 'aphrodite/no-important';

const image = require('./default.svg');

const styles = StyleSheet.create({
  card: {
    position: 'relative',
    backgroundColor: definitions.colors.darkGrey,
  }
});

const BandCard = (b: Band) => {
  const bg = StyleSheet.create({
    bg: {
      width: '100%',
      height: '100%',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundImage: `url(${b.imageUrl || image})`,
      position: 'absolute',
    }
  });
  return (
    <div className={css(styles.card, sharedStyles.elevate)} key={b.url}>
      <div className={css(bg.bg)} />
      {b.name} {b.imageUrl}
    </div>
  );
};

export default BandCard;