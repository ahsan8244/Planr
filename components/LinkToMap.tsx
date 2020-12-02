import * as React from 'react';
import { Alert, Linking } from 'react-native';

import { Button } from 'react-native-paper';

const { useCallback } = React;

export const LinkToMap = ({ url, text }: { url: string; text: string }) => {
  const handlePress = useCallback(async () => {
    try {
      Linking.openURL(url);
    } catch (err) {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);

  return <Button onPress={handlePress}>{text}</Button>;
};
