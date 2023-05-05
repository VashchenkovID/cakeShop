import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { ReduxRouter } from '@lagunovsky/redux-react-router';
import { browserHistory } from './history/history';
import { setupStore } from './redux/store';
import { setAutoFreeze } from 'immer';
import { AppRouter } from './components/AppRouter';
import Header from 'src/components/Header';
import { Theme } from '@consta/uikit/Theme';
import { myDefaultPreset } from 'src/utils/presetConsta/constaMyStyle/myDefaultPreset';

const store = setupStore();

const App = () => {


  useEffect(() => {
    setAutoFreeze(false);
  }, []);
  return (
    <Provider store={store}>
      <Theme preset={myDefaultPreset}>
        <ReduxRouter history={browserHistory} store={store}>
          <Header />
          <AppRouter />
        </ReduxRouter>
      </Theme>
    </Provider>
  );
};

export default App;
