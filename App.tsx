/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';
import RNSentiance from 'react-native-sentiance';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import Header from './src/components/Header';
import Dashboard from './src/views/Dashboard';
import Home from './src/views/Home';

const App = () => {
  const [showScreen, setShowScreen] = useState<boolean | string>(false);
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    /**
     * Determines which screen is to be displayed.
     *
     * If the SDK is initialized display "<Dashboard />" else
     * display <Home />
     */
    RNSentiance.getInitState().then(state => {
      setShowScreen(state === 'INITIALIZED' ? 'DASHBOARD' : 'HOME');
    });
  }, []);

  if (!showScreen) {
    return null;
  }

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Header />
      {showScreen === 'DASHBOARD' && <Dashboard />}
      {showScreen === 'HOME' && <Home />}
    </SafeAreaView>
  );
};

export default App;
