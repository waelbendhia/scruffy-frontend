import * as React from 'react';
import Header from './header';
import Background from './background';
import Body from './body';
import Footer from './footer';
import DocumentTitle from 'react-document-title';

const App = () =>
  (
    <DocumentTitle title='Scaruffi2.0'>
      <div>
        <link
          href='https://fonts.googleapis.com/icon?family=Material+Icons'
          rel='stylesheet'
        />
        <Header />
        <Background />
        <Body />
        <Footer />
      </div>
    </DocumentTitle>
  );

export default App;
