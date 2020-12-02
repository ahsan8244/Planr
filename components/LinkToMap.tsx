import * as React from 'react';
import { Alert, Button, Linking, View } from 'react-native';

const { useCallback } = React;

const OpenURLButton = ({ url, children }: any) => {
  const handlePress = useCallback(async () => {
    try {
      Linking.openURL(url);
    } catch (err) {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);

  return <Button title={children} onPress={handlePress} />;
};

export const LinkToMap: React.FC = () => {
  return (
    <View>
      <OpenURLButton url="https://maps.google.com/maps?daddr=38.7875851,-9.3906089">
        Open Supported URL
      </OpenURLButton>
    </View>
  );
};
