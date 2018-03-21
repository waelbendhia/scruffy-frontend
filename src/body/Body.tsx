import * as React from 'react';
import { Route } from 'react-router-dom';
import Home from '../home';
import { State as HomeState } from '../home';
import Bands from '../bands';
import { State as BandsState } from '../bands';
import Albums from '../albums';
import Directors from '../directors';
import Films from '../films';
import { StyleSheet, css } from 'aphrodite/no-important';
import { definitions } from '../shared';

const styles = StyleSheet.create({
  body: {
    minHeight: `calc(100vh - ${definitions.headerHeight})`,
  }
});

const View = ({ home, bands }: { home: HomeState, bands: BandsState }) => (
  <div className={css(styles.body)}>
    <Route
      exact={true}
      path="/"
      render={() => <Home {...home} />}
    />
    <Route
      exact={true}
      path="/bands"
      component={() => <Bands {...bands} />}
    />
    <Route exact={true} path="/albums" component={Albums} />
    <Route exact={true} path="/directors" component={Directors} />
    <Route exact={true} path="/films" component={Films} />
  </div>
);

export default View;
