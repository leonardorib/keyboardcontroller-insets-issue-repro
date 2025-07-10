import React from 'react';

import {Text, View} from 'react-native';

function App(): React.JSX.Element {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
      }}>
      <Text>Hello World</Text>
    </View>
  );
}

export default App;
