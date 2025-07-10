import React, {useState} from 'react';
import {View, Text, Button, StyleSheet, Platform} from 'react-native';
import {KeyboardProvider} from 'react-native-keyboard-controller';

import {SystemBars} from 'react-native-edge-to-edge';

// Our Native Component
import InsetDemoView from './InsetDemoView';

const App = () => {
  const [shouldRenderKeyboardProvider, setShouldRenderKeyboardProvider] =
    useState(false);

  const [hasShownKeyboardProvider, setHasShownKeyboardProvider] =
    useState(false);

  return (
    <View style={styles.container}>
      <SystemBars hidden={false} style={'dark'} />

      <InsetDemoView style={styles.demoView} />

      {shouldRenderKeyboardProvider ? (
        <KeyboardProvider
        // We are on edge-to-edge and have react-native-edge-to-edge
        // so the `statusBarTranslucent` prop is implicitly `true`
        >
          <></>
        </KeyboardProvider>
      ) : null}

      <View style={styles.controlPanel}>
        <Text style={styles.title}>Issue Demo</Text>

        {Platform.OS === 'android' ? null : (
          <>
            <Text style={styles.warningText}>
              This issue is Android specific!
            </Text>
            <View style={styles.spacer12} />
          </>
        )}

        <Text>
          shouldRenderKeyboardProvider: {`${shouldRenderKeyboardProvider}`}
        </Text>

        <View style={styles.spacer12} />

        <Text>hasShownKeyboardProvider: {`${hasShownKeyboardProvider}`}</Text>

        <View style={styles.spacer12} />

        {hasShownKeyboardProvider ? (
          <View style={styles.renderedOnceMessageContainer}>
            <Text style={styles.warningText}>
              You rendered the KeyboardProvider at least once.
            </Text>
            <Text style={styles.warningText}>
              Now the top system inset is 0 and our dummy close button from the
              native view that relies on that will collide with the statusbar.
            </Text>
            <Text style={styles.warningText}>
              If you want to reset the system insets you need to quit and reopen
              the app.
            </Text>
          </View>
        ) : null}

        <View style={styles.spacer12} />

        <Button
          title="Toggle KeyboardProvider"
          onPress={() => {
            if (!hasShownKeyboardProvider) {
              setHasShownKeyboardProvider(true);
            }

            setShouldRenderKeyboardProvider(prev => !prev);
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  demoView: {
    flex: 1,
  },
  warningText: {
    color: 'red',
  },
  controlPanel: {
    position: 'absolute',
    bottom: 80,
    left: 20,
    right: 20,
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  renderedOnceMessageContainer: {
    gap: 8,
  },
  spacer12: {
    height: 12,
  },
});

export default App;
