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
  IState as BandsState,
  initialState as bandsInitialState,
} from './bands';
import {
  IState as AlbumsState,
  initialState as albumsInitialState,
} from './albums';
import {
  State as BandState,
  initialState as bandInitialState,
} from './band';
import { Location } from 'history';

class App extends React.Component<{}, {
  location: Location,
  home: HomeState,
  bands: BandsState
  albums: AlbumsState,
  band: BandState,
}> {
  constructor(props: {}) {
    super(props);

    this.state = {
      location: store.getState().router.location || history.location,
      home: homeInitialState,
      bands: bandsInitialState,
      albums: albumsInitialState,
      band: bandInitialState,
    };

    store.subscribe(() => {
      const { router, home, bands, albums, band } = store.getState();
      if (!router.location) {
        document.title = 'Scaruffi2.0';
      } else {
        switch (router.location.pathname) {
          case '/bands':
            document.title = 'Scaruffi2.0: Bands';
            break;
          case '/albums':
            document.title = 'Scaruffi2.0: Albums';
            break;
          default:
            if (router.location.pathname.indexOf('bands') !== -1) {
              document.title = `Scaruffi2.0: ${
                band.failed
                  ? 'error'
                  : band.loading
                    ? ''
                    : band.data.name
                }`;
            } else {
              document.title = 'Scaruffi2.0';
            }
            break;
        }
      }
      this.setState({
        location: router.location || history.location,
        home,
        bands,
        albums,
        band,
      });
    });
  }

  render() {
    return (
      <div>
        <Header location={this.state.location.pathname} />
        <Background />
        <Body {...this.state} />
        <Footer />
      </div>
    );
  }
}

export default App;