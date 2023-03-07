import React, { useEffect, useRef, useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import Lottie from 'lottie-react-native';

function App(): JSX.Element {

  const [record, setRecord] = useState<boolean>(false);
  const triggerRecord = () => setRecord(old => !old);
  useEffect(() => {
    if (lottieRef?.current) {
      if (record) {
        lottieRef.current.play();
      }
      else{
        lottieRef.current.reset();
      }
    }
  }, [record]);

  const lottieRef = useRef<Lottie>(null);

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <Text>test</Text>
      <TouchableOpacity onPressIn={triggerRecord} onPressOut={triggerRecord}>
        <Lottie
          ref={lottieRef}
          style={{ width: 200, height: 200 }}
          source={require('./src/lottie/record.json')}
          loop
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
