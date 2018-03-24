import * as React from 'react';
import Header from './header';
import Background from './background';
import Body from './body';
import Footer from './footer';
import store from './store';
import { history } from './store';
import {
  State as HomeState,
  initialState as homeInitialState,
} from './home';
import {
  State as BandsState,
  initialState as bandsInitialState,
} from './bands';
import {
  State as AlbumsState,
  initialState as albumsInitialState,
} from './albums';
import { Location } from 'history';

class App extends React.Component<{}, {
  location: Location,
  home: HomeState,
  bands: BandsState
  albums: AlbumsState,
}> {
  constructor(props: {}) {
    super(props);

    this.state = {
      location: store.getState().router.location || history.location,
      home: homeInitialState,
      bands: bandsInitialState,
      albums: albumsInitialState,
    };

    store.subscribe(() => {
      const { router, home, bands, albums } = store.getState();
      this.setState({
        location: router.location || history.location,
        home,
        bands,
        albums,
      });
    });
  }

  render() {
    return (
      <div>
        <Header location={this.state.location.pathname} />
        <Background />
        <Body
          location={this.state.location}
          home={this.state.home}
          bands={this.state.bands}
          albums={this.state.albums}
        />
        <Footer />
      </div>
    );
  }
}

export default App;