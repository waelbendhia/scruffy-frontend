import * as React from 'react';
import Header from './header';
import Background from './background';
import Body from './body';
import Footer from './footer';
import store from './store';
export default class App extends React.Component<{}, { location: string }> {
  constructor(props: {}) {
    super(props);

    this.state = {
      location: (store.getState().router.location || { pathname: '' }).pathname,
    };

    store.subscribe(() => {
      this.setState({
        location:
          (store.getState().router.location || { pathname: '' }).pathname
      });
    });
  }

  render() {
    return (
      <div className="App">
        <Header location={this.state.location} />
        <Background />
        <Body />
        <Footer />
      </div>
    );
  }
}