import * as React from 'react';
import Header from './header';
import Background from './background';
import Body from './body';
import Footer from './footer';
import store from './store';
import * as Home from './home';

class App extends React.Component<{}, { location: string, home: Home.State }> {
  constructor(props: {}) {
    super(props);

    this.state = {
      location: (store.getState().router.location || { pathname: '' }).pathname,
      home: Home.initialState,
    };

    store.subscribe(() => {
      const { router, home } = store.getState();
      this.setState({
        location:
          (router.location || { pathname: '' }).pathname,
        home,
      });
    });
  }

  render() {
    return (
      <div>
        <Header location={this.state.location} />
        <Background />
        <Body home={this.state.home} />
        <Footer />
      </div>
    );
  }
}

export default App;