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
import SentianceCore from '@sentiance-react-native/core';

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
    SentianceCore.userExists().then((userExists: any) => {
      setShowScreen(userExists ? 'DASHBOARD' : 'HOME');
    });
  }, []);

  if (!showScreen) {
    return null;
  }

  const updateScreen = (screen: string) => {
    setShowScreen(screen);
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Header />
      {showScreen === 'DASHBOARD' && (
        <Dashboard showHomeScreen={() => updateScreen('HOME')} />
      )}
      {showScreen === 'HOME' && (
        <Home showDashboardScreen={() => updateScreen('DASHBOARD')} />
      )}
    </SafeAreaView>
  );
};

export default App;
