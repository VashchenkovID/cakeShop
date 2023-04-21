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
import userAPI from 'src/api/requests/userAPI';
import { LocalStorageKeysEnum } from 'src/utils/enum';

const store = setupStore();

const App = () => {
  const checkCurrentUser = async () => {
    try {
      await userAPI.checkCurrentUser().then((r) => {
        localStorage.setItem(LocalStorageKeysEnum.TOKEN, r.data.token);
      });
    } catch (e) {
      localStorage.clear();
    }
  };

  useEffect(() => {
    checkCurrentUser();
  }, []);

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
