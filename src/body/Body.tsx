import * as React from 'react';
import { Route } from 'react-router-dom';
import Home from '../home';
import Bands from '../bands';
import Albums from '../albums';
import Directors from '../directors';
import Films from '../films';
import { StyleSheet, css } from 'aphrodite/no-important';
import { definitions } from '../shared';

const styles = StyleSheet.create({
  body: {
    height: `calc(100vh - ${definitions.headerHeight})`,
  }
});
export default () => (
  <div className={css(styles.body)}>
    <Route exact={true} path="/" component={Home} />
    <Route exact={true} path="/bands" component={Bands} />
    <Route exact={true} path="/albums" component={Albums} />
    <Route exact={true} path="/directors" component={Directors} />
    <Route exact={true} path="/films" component={Films} />
  </div>
); 