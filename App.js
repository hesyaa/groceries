import React, {Component} from 'react';
import {Text, View} from 'react-native';
import Home from './src/screen/Home';
import {NavigationContainer} from '@react-navigation/native';
import Router from './src/routes';

export class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Router />
      </NavigationContainer>
    );
  }
}

export default App;
