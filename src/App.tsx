import * as React from 'react';
import Header from './header';
import Background from './background';
import Body from './body';
import Footer from './footer';

// if (!router.location) {
//   document.title = 'Scaruffi2.0';
// } else {
//   switch (router.location.pathname) {
//     case '/bands':
//       document.title = 'Scaruffi2.0: Bands';
//       break;
//     case '/albums':
//       document.title = 'Scaruffi2.0: Albums';
//       break;
//     default:
//       if (router.location.pathname.indexOf('bands') !== -1) {
//         document.title = `Scaruffi2.0: ${band.caseOf({
//           ok: b => b.name,
//           err: 'error',
//           loading: '',
//         })}`;
//       } else {
//         document.title = 'Scaruffi2.0';
//       }
//       break;
//   }
// }

const App = () =>
  (
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
  );

export default App;
