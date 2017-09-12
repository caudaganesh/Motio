/**
 * Sample React Native App
 * https:github.com/facebook/react-native
 * @flow
 */


import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Dimensions,
  DeviceEventEmitter
} from 'react-native';

import { SensorManager } from 'NativeModules';
import SlidingUpPanel from 'rn-sliding-up-panel'
import Tts from 'react-native-tts';
const { height } = Dimensions.get('window')
const firebase = require('firebase');
const firebaseConfig = {
  apiKey: "AIzaSyBZNtefjbHz2-N2CLJyQJRN_t_TnCCfYU0",
  authDomain: "motio-f5848.firebaseapp.com",
  databaseURL: "https://motio-f5848.firebaseio.com",
  storageBucket: "motio-f5848.appspot.com",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

export default class Motio extends Component {

  static defaultProps = {
    draggableRange: {
      top: height / 1.5,
      bottom: 120
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      visible: false
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
        Tts.setDefaultRate(0.33);
        Tts.speak(this.state.counter.toString());
      }
    });
  }



  componentWillReceiveProps(nextProps) {
    console.log("NEXT", nextProps);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.mainContainer}>
          <Text style={styles.counterText}>
            {this.state.counter}
          </Text>
        </View>
        <SlidingUpPanel
          visible
          showBackdrop={false}
          ref={(c) => { this._panel = c }}
          draggableRange={this.props.draggableRange}>
          <View style={styles.panel}>
            <View style={styles.panelHeader}>
              <Text style={{ color: '#000', fontSize: 25,
               fontWeight: 'bold',
               fontFamily: 'monospace' }}>WORKOUT MENU</Text>
            </View>
            <View style={styles.container}>
              <Text>Bottom Sheet Content</Text>
            </View>
          </View>
        </SlidingUpPanel>
      </View>

    );
  }
}

const styles = {
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ffc425',
    alignItems: 'center',
    justifyContent: 'center'
  },
  mainContainer: {
    alignSelf: 'stretch',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  counterText: {
    fontSize: 70,
    fontFamily: 'monospace',
    fontWeight: 'bold',
    color: '#ffbf00'
  },
  panel: {
    flex: 1,
    backgroundColor: 'white',
    position: 'relative'
  },
  panelHeader: {
    height: 120,
    backgroundColor: '#ffbf00',
    alignItems: 'center',
    justifyContent: 'center'
  },
  favoriteIcon: {
    position: 'absolute',
    top: -24,
    right: 24,
    backgroundColor: '#2b8a3e',
    width: 48,
    height: 48,
    padding: 8,
    borderRadius: 24,
    zIndex: 1
  }
}

AppRegistry.registerComponent('Motio', () => Motio);
