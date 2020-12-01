import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import AuthNavigation from './navigation/AuthNavigation';
import { User } from './types';
import { UserContext } from './context';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else if (user) {
    return (
      <UserContext.Provider value={{ user, setUser }}>
        <PaperProvider>
          <SafeAreaProvider>
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
          </SafeAreaProvider>
        </PaperProvider>
      </UserContext.Provider>
    );
  } else {
    return (
      <UserContext.Provider value={{ user, setUser }}>
        <PaperProvider>
          <SafeAreaProvider>
            <AuthNavigation colorScheme={colorScheme} />
            <StatusBar />
          </SafeAreaProvider>
        </PaperProvider>
      </UserContext.Provider>
    );
  }
}
