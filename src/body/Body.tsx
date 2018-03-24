import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../home';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { State as HomeState } from '../home';
import Bands from '../bands';
import { State as BandsState } from '../bands';
import Albums from '../albums';
import { State as AlbumsState } from '../albums';
import Directors from '../directors';
import Films from '../films';
import { StyleSheet, css } from 'aphrodite/no-important';
import { definitions } from '../shared';
import { Location } from 'history';

const styles = StyleSheet.create({
  body: {
    minHeight: `calc(100vh - ${definitions.headerHeight})`,
  },
  enter: {
    opacity: 0,
    transform: 'translateY(10px)',
    transitionDuration: definitions.transitions.slow,
  },
  enterActive: {
    opacity: 1,
    position: 'absolute',
    width: '100%',
    transform: 'translateY(0px)',
  },
  exit: {
    opacity: 1,
    transform: 'translateY(0px)',
  },
  exitActive: {
    opacity: 0,
    position: 'absolute',
    width: '100%',
    transform: 'translateY(10px)',
    transitionDuration: definitions.transitions.slow,
  },
});

interface BodyProps {
  location: Location;
  home: HomeState;
  bands: BandsState;
  albums: AlbumsState;
}
const View = ({ location, home, bands, albums }: BodyProps) => (
  <TransitionGroup className={css(styles.body)}>
    <CSSTransition
      key={location.pathname}
      timeout={300}
      classNames={{
        appear: css(styles.enter),
        appearActive: css(styles.enterActive),
        enter: css(styles.enter),
        enterActive: css(styles.enterActive),
        exit: css(styles.exit),
        exitActive: css(styles.exitActive),
      }}
    >
      <Switch location={location}>
        <Route
          exact={true}
          path="/"
          render={() => <Home {...home} />}
        />
        <Route
          exact={true}
          path="/bands"
          render={() => <Bands {...bands} />}
        />
        <Route
          exact={true}
          path="/albums"
          render={() => <Albums {...albums} />}
        />
        <Route
          exact={true}
          path="/directors"
          render={() => <Directors />}
        />
        <Route
          exact={true}
          path="/films"
          render={() => <Films />}
        />
      </Switch>
    </CSSTransition>
  </TransitionGroup>
);

export default View;
