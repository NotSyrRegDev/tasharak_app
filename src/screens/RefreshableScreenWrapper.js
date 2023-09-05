import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, RefreshControl, View, Text, StyleSheet, AppState } from 'react-native';

const RefreshableScreenWrapper = ({ component: Component, children }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [reset, setReset] = useState(false);
  const [appState, setAppState] = useState('active');

  const onRefresh = () => {
    setRefreshing(true);
    // Perform the refresh operation
    // Once the refresh is complete, set refreshing to false
    setReset(true);
  };

  const resetState = () => {
    if (reset && appState === 'active') {
      setReset(false);
      // Reset the state here, e.g., set text field values to their initial state
    }
  };

  useEffect(() => {
    const handleAppStateChange = (nextAppState) => {
      setAppState(nextAppState);
    };

    const appStateListener = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      appStateListener.remove(); // Remove the event listener
    };
  }, []);

  useEffect(() => {
    resetState();
  }, [reset]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {Component ? <Component reset={reset} /> : React.Children.map(children, (child) => React.cloneElement(child, { reset }))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
});

export default RefreshableScreenWrapper;