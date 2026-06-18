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
import Initialization from './src/views/Initialization';

const App = () => {
  const [initialized, setInitialized] = useState(false);
  const [showScreen, setShowScreen] = useState<boolean | string>(false);
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    flex: 1,
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    if (!initialized) {
      return;
    }
    /**
     * Once the SDK is initialized, route to the dashboard if a Sentiance user
     * already exists, otherwise show the user-creation home screen.
     */
    SentianceCore.userExists().then((userExists: boolean) => {
      setShowScreen(userExists ? 'DASHBOARD' : 'HOME');
    });
  }, [initialized]);

  const updateScreen = (screen: string) => {
    setShowScreen(screen);
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Header />
      {!initialized && (
        <Initialization onInitialized={() => setInitialized(true)} />
      )}
      {initialized && showScreen === 'DASHBOARD' && (
        <Dashboard showHomeScreen={() => updateScreen('HOME')} />
      )}
      {initialized && showScreen === 'HOME' && (
        <Home showDashboardScreen={() => updateScreen('DASHBOARD')} />
      )}
    </SafeAreaView>
  );
};

export default App;
