/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {Component} from 'react';
import {ActivityIndicator, Text, useColorScheme} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import YouTubePlayer, {YouTubePlayerProps} from './players/YouTubePlayer';
import Home from './screens/Home';
import MovieDetails, {MovieDetailsProps} from './screens/MovieDetails';

const Stack = createNativeStackNavigator<StackParams>();

export type StackParams = {
  Home: undefined;
  MovieDetails: MovieDetailsProps;
  YouTubePlayer: YouTubePlayerProps;
};

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{headerShown: true}}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="MovieDetails" options={{title: "Movie Details"}} component={MovieDetails} />
          <Stack.Screen name="YouTubePlayer" options={{title: "Player"}} component={YouTubePlayer} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
