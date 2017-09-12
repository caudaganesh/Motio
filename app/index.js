/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  DeviceEventEmitter
} from 'react-native';

import { SensorManager } from 'NativeModules';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      counter: 0
    };
  }

  componentWillMount() {

    SensorManager.startProximity(20);
    DeviceEventEmitter.addListener('Proximity', (data) => {
      /**
      * data.isNear: [Boolean] A flag representing whether something is near the screen.
      * data.value: [Number] The raw value returned by the sensor (usually distance in cm).
      * data.maxRange: [Number] The maximum range of the sensor.
      **/
      if (data.value === 0) {
        this.setState({
          counter: this.state.counter += 1
        })
      }
    });
  }



  componentWillReceiveProps(nextProps) {
    console.log("NEXT", nextProps);
  }

  render() {
    console.log(this.state.counter)
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          {this.state.counter}
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.android.js
        </Text>
        <Text style={styles.instructions}>
          Double tap R on your keyboard to reload,{'\n'}
          Shake or press menu button for dev menu
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

