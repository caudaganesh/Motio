/**
 * Sample React Native App
 * https:github.com/facebook/react-native
 * @flow
 */


import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  DeviceEventEmitter,
  TouchableHighlight,
  ListView,
  Modal
} from 'react-native';
import DrawerLayoutAndroid from 'react-native-drawer-layout';
import Image from 'react-native-image-progress';
import GridView from 'react-native-easy-gridview'
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Left, Body, Right } from 'native-base';

import { SensorManager } from 'NativeModules';
import SlidingUpPanel from 'rn-sliding-up-panel';
import Tts from 'react-native-tts';
import { Stopwatch, Timer } from 'react-native-stopwatch-timer';
import Icon from 'react-native-vector-icons';

const { height } = Dimensions.get('window')
const firebase = require('firebase');
const firebaseConfig = {
  apiKey: "AIzaSyBZNtefjbHz2-N2CLJyQJRN_t_TnCCfYU0",
  authDomain: "motio-f5848.firebaseapp.com",
  databaseURL: "https://motio-f5848.firebaseio.com",
  storageBucket: "motio-f5848.appspot.com",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const styles = require('./styles.js')

export default class Motio extends Component {

  static defaultProps = {
    draggableRange: {
      top: height / 2.5,
      bottom: 120
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      visible: false,
      invisible: false,
      timerStart: false,
      stopwatchStart: false,
      timerReset: false,
      stopwatchReset: false,
      selectedMenu: {},
      currentTime: '',
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      savedDataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      })
    };
    this.toggleTimer = this.toggleTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.toggleStopwatch = this.toggleStopwatch.bind(this);
    this.resetStopwatch = this.resetStopwatch.bind(this);
    this.itemsRef = this.getRef().child('workout_menu');
    this.itemsSaved = this.getRef().child('saved');
  }

  getRef() {
    return firebaseApp.database().ref();
  }

  listenForItems(itemsRef) {
    itemsRef.on('value', (snap) => {
      // get children as an array
      var items = [];
      snap.forEach((child) => {
        items.push({
          title: child.val().Workout,
          icon: child.val().Icon,
          color: child.val().Color,
          description: child.val().Description,
          _key: child.key
        });
      });
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(items)
      });

    });
  }

  listenForSavedItems(itemsSaved) {
    itemsSaved.on('value', (snap) => {
      // get children as an array
      var items = [];
      snap.forEach((child) => {
        items.push({
          title: child.val().Workout,
          icon: child.val().Icon,
          color: child.val().Color,
          description: child.val().Description,
          total: child.val().Total,
          _key: child.key
        });
      });

      this.setState({
        savedDataSource: this.state.savedDataSource.cloneWithRows(items)
      });
    });
  }

  onMenuPressed(item) {
    this.setState({ selectedMenu: item });
    console.log("CLICKED", item);
    this._drawer.closeDrawer();
    this.setState({ invisible: !this.state.invisible });
  }

  saveProgress() {
    console.log(this)
    this.itemsSaved.push({
      Workout: this.state.selectedMenu.title,
      Icon: this.state.selectedMenu.icon,
      Color: this.state.selectedMenu.color,
      Description: this.state.selectedMenu.description,
      Total: this.state.counter,
      Time: this.state.currentTime
    });

    this.setState({
      counter: 0
    })
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

  componentDidMount() {
    this.listenForItems(this.itemsRef);
    this.listenForSavedItems(this.itemsSaved)
  }

  toggleTimer() {
    this.setState({ timerStart: !this.state.timerStart, timerReset: false });
  }

  resetTimer() {
    this.setState({ timerStart: false, timerReset: true });
  }

  toggleStopwatch() {
    this.setState({ stopwatchStart: !this.state.stopwatchStart, stopwatchReset: false });
  }

  resetStopwatch() {
    this.setState({ stopwatchStart: false, stopwatchReset: true });
  }

  getFormattedTime(time) {
    this.currentTime = time;
  }

  render() {
    var savedNavigationView = (
      <View style={{ flex: 1, backgroundColor: '#ffbf00' }}>
        <ListView
          dataSource={this.state.savedDataSource}
          renderRow={this._renderSavedItem.bind(this)}
          removeClippedSubviews={false} />
      </View>
    );

    var navigationView = (
      <View style={{ flex: 1, backgroundColor: '#ffbf00' }}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderItem.bind(this)}
          removeClippedSubviews={false} />
      </View>
    );
    return (
      <DrawerLayoutAndroid
        drawerWidth={300}
        drawerLockMode='unlocked'
        ref={(ref) => this._savedDrawer = ref}
        drawerPosition={DrawerLayoutAndroid.positions.Right}
        renderNavigationView={() => savedNavigationView}>
        <DrawerLayoutAndroid
          drawerWidth={300}
          drawerLockMode='unlocked'
          ref={(ref) => this._drawer = ref}
          drawerPosition={DrawerLayoutAndroid.positions.Left}
          renderNavigationView={() => navigationView}>
          <View style={styles.container}>
            {Object.keys(this.state.selectedMenu).length !== 0 && this.state.selectedMenu.constructor === Object ?
              <View style={{
                backgroundColor: '#ffbf00',
                padding: 20,
                flexDirection: 'row'
              }}>
                <Image
                  source={{ uri: this.state.selectedMenu.icon }}
                  style={styles.imageContainer}
                  resizeMode={'stretch'} />
                <Text style={styles.titleText}>{this.state.selectedMenu.title}</Text>
              </View> : <View />}
            <View style={styles.mainContainer}>
              <Text style={styles.counterText}>
                {this.state.counter}
              </Text>
            </View>
            <SlidingUpPanel
              visible
              showBackdrop={false}
              ref={(c) => { this._panel = c }}
              draggableRange={this.props.draggableRange}
              style={{ flex: 1 }}>
              <View style={styles.panel}>
                <View style={styles.panelHeader}>
                  <Stopwatch
                    start={this.state.timerStart}
                    msecs={false}
                    reset={this.state.timerReset}
                    options={options}
                    handleFinish={handleTimerComplete}
                    getTime={this.getFormattedTime} />
                </View>
                <View style={styles.panelContainer}>
                  <TouchableHighlight onPress={this.toggleTimer}>
                    <Text style={styles.textButton}>{!this.state.timerStart ? "START" : "STOP"}</Text>
                  </TouchableHighlight>
                  <TouchableHighlight onPress={this.resetTimer}>
                    <Text style={styles.textButton}>RESET</Text>
                  </TouchableHighlight>
                  <TouchableHighlight onPress={() => this.saveProgress()}>
                    <Text style={styles.textButton}>SAVE PROGRESS</Text>
                  </TouchableHighlight>
                </View>
              </View>
            </SlidingUpPanel>
            <Modal
              animationType='slide'
              transparent={ true }
              visible={ this.state.invisible }
              onRequestClose={ () => this.setState({ invisible: !this.state.invisible }) }
            >
              <View style={ styles.modal }>
                <Text>{ this.state.selectedMenu.description }</Text>
                <TouchableOpacity onPress={() => this.setState({ invisible: !this.state.invisible })}>
                    <Text>OK</Text>
                </TouchableOpacity>
              </View>
            </Modal>
          </View>
        </DrawerLayoutAndroid>
      </DrawerLayoutAndroid>
    );
  }


  _renderItem(item) {
    return (
      <TouchableOpacity onPress={() => this.onMenuPressed(item)}>
        <View style={styles.item}>
          <Image
            source={{ uri: item.icon }}
            style={styles.imageContainer}
            resizeMode={'stretch'} />
          <Text style={styles.actionText}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  _renderSavedItem(item) {
    return (
      <TouchableOpacity onPress={() => this.onMenuPressed(item)}>
        <View style={styles.item}>
          <Image
            source={{ uri: item.icon }}
            style={styles.imageContainer}
            resizeMode={'stretch'} />
          <View>
            <Text style={styles.totalText}>{item.total}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const handleTimerComplete = () => alert("Workout complete");

const options = {
  containerOpt: {
    backgroundColor: 'transparent',
    padding: 5,
    borderRadius: 5,
    width: 220,
  },
  text: {
    fontSize: 30,
    color: '#000',
    marginLeft: 7,
    fontWeight: 'bold'
  }
};



AppRegistry.registerComponent('Motio', () => Motio);
