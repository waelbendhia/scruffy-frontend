import * as React from 'react';
import { Header } from './header';
import Background from './background';
import Body from './body';
import Footer from './footer';
import store from './store';
import { initialState, IState, history } from './store';
import { Location } from 'history';

class App extends React.Component<{}, IState & { location: Location }> {
  constructor(props: {}) {
    super(props);

    this.state = {
      ...initialState,
      location: store.getState().router.location || history.location,
    };

    store.subscribe(() => {
      const state = store.getState();
      const { router, band } = state;
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
        ...state,
        location: router.location || history.location,
      });
    });
  }

  render() {
    return (
      <div>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
        <Header
          {...this.state.header}
          location={this.state.location.pathname}
        />
        <Background />
        <Body {...this.state} />
        <Footer />
      </div>
    );
  }
}

export default App;