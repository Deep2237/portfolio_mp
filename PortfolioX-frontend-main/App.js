import React, { useEffect } from 'react';
// import { useFonts } from 'expo-font';
import { PaperProvider } from 'react-native-paper';
import Main from './Main';
import * as Font from 'expo-font';
import { Provider } from 'react-redux';
import store from './redux/store';

export default function App() {
  useEffect(() => {
    (async () => await Font.loadAsync({
      // Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('./assets/fonts/Roboto-Medium.ttf'),

    }))();
  }, [])

  return (
    <Provider store={store}>
      <PaperProvider>
        <Main />
      </PaperProvider>
    </Provider>
  );
}
