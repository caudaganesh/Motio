
/**
 * Sample React Native App
 * https:github.com/facebook/react-native
 * @flow
 */


import React, { Component } from 'react';
import {
  AppRegistry,
  View,
  TouchableOpacity,
  Dimensions,
  DeviceEventEmitter,
  ListView,
  StatusBar,
  Modal
} from 'react-native';
import DrawerLayoutAndroid from 'react-native-drawer-layout';
import Image from 'react-native-image-progress';
import { Text, Button } from 'native-base';
import { SensorManager } from 'NativeModules';
import SlidingUpPanel from 'rn-sliding-up-panel';
import Tts from 'react-native-tts';
import Icon from 'react-native-vector-icons/FontAwesome';
import _ from 'lodash';

import ProgressChart from './components/ProgressChart';
import SlidingUpModalMenu from './components/SlidingUpModalMenu';
import { firebaseConfig } from './config/local'
import styles from "./styles"

const { height } = Dimensions.get('window')
const firebase = require('firebase');

const firebaseApp = firebase.initializeApp(firebaseConfig);

class App extends Component {

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
      buttonStatus: true,
      buttonSaveStatus: true,
      timerStart: false,
      stopwatchStart: false,
      timerReset: false,
      stopwatchReset: false,
      selectedMenu: {},
      curTime: '',
      selectedInfo: {},
      dataSet: [],
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
          timeElapsed: child.val().TimeElapsed,
          createdAt: new Date(child.val().CreatedAt),
          _key: child.key
        });
      });
      const grouped = _.groupBy(items, item => item.createdAt.toDateString());
      const final_grouped = []
      let counter = 0;
      _.mapValues(grouped, (val, key) => {
        counter++;
        var chartitem = {}
        chartitem['x'] = counter;
        chartitem['y'] = _.sumBy(val, 'total');
        chartitem['marker'] = key
        final_grouped.push(chartitem)
      })
      this.setState({
        savedDataSource: this.state.savedDataSource.cloneWithRows(items),
        dataSet: final_grouped
      });
    });
  }

  onMenuPressed(item) {
    this.setState({ buttonStatus: false });
    this.setState({ selectedMenu: item });
    this._drawer.closeDrawer();
  }

  onInfoPressed(item) {
    this.setState({ selectedInfo: item });
    this.setState({ invisible: !this.state.invisible });
  }

  saveProgress() {
    this.itemsSaved.push({
      Workout: selectedMenu.title,
      Icon: selectedMenu.icon,
      Color: selectedMenu.color,
      Description: selectedMenu.description,
      Total: this.state.counter,
      TimeElapsed: this.currentTime,
      CreatedAt: new Date().toUTCString()
    });

    this.setState({
      counter: 0,
      timerReset: true,
      buttonSaveStatus: true
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
      let { counter } = this.state
      if (data.value === 0) {
        this.setState({
          counter: counter += 1
        })
        Tts.setDefaultRate(0.33);
        Tts.speak(counter.toString());
      }
    });
  }

  componentDidMount() {
    this._drawer.openDrawer();
    this.listenForItems(this.itemsRef);
    this.listenForSavedItems(this.itemsSaved)
  }

  toggleTimer() {
    this.setState({ timerStart: !this.state.timerStart, timerReset: false });
    this.setState({ buttonSaveStatus: !this.state.timerStart });
  }

  resetTimer() {
    this.setState({ timerStart: false, timerReset: true, buttonSaveStatus: true, counter: 0 });
  }

  toggleStopwatch() {
    this.setState({ stopwatchStart: !this.state.stopwatchStart, stopwatchReset: false });
  }

  resetStopwatch() {
    this.setState({ stopwatchStart: false, stopwatchReset: true });
  }

  getFormattedTime = (time) => {
    this.currentTime = time
  }

  render() {

    const { dataSet, dataSource, savedDataSource } = this.state;
    var savedNavigationView = (
      <View style={styles.savedNavigationView}>
        {dataSet && dataSet.length > 0 ?
          <ProgressChart
            style={{ flex: 1 }}
            dataSet={dataSet} /> : <View />
        }
        <ListView
          dataSource={savedDataSource}
          renderRow={this._renderSavedItem.bind(this)}
          removeClippedSubviews={false} />
      </View>
    );

    var navigationView = (
      <View style={{ flex: 1, backgroundColor: '#ffbf00' }}>
        <ListView
          dataSource={dataSource}
          renderRow={this._renderItem.bind(this)}
          removeClippedSubviews={false} />
      </View>
    );

    const { selectedMenu, selectedInfo, timerStart, timerReset, buttonStatus, buttonSaveStatus } = this.state
    const { saveProgress, resetTimer, toggleTimer, getFormattedTime } = this
    return (
      <DrawerLayoutAndroid
        drawerWidth={300}
        drawerLockMode='unlocked'
        ref={(ref) => this._savedDrawer = ref}
        drawerPosition={DrawerLayoutAndroid.positions.Right}
        renderNavigationView={() => savedNavigationView}>
        <StatusBar hidden />
        <DrawerLayoutAndroid
          drawerWidth={300}
          drawerLockMode={this.currentTime === "00:00:00" || !this.state.timerStart ? 'unlocked' : 'locked-closed'}
          ref={(ref) => this._drawer = ref}
          drawerPosition={DrawerLayoutAndroid.positions.Left}
          renderNavigationView={() => navigationView}>
          <View style={styles.container}>
            {Object.keys(selectedMenu).length !== 0 && selectedMenu.constructor === Object ?
              <View style={{
                backgroundColor: '#ffbf00',
                padding: 20,
                flexDirection: 'row'
              }}>
                <Image
                  source={{ uri: selectedMenu.icon }}
                  style={styles.imageContainer}
                  resizeMode={'stretch'} />
                <Text style={styles.titleText}>{selectedMenu.title}</Text>
              </View> : <View />}
            <View style={styles.mainContainer}>
              <Text style={styles.counterText}>
                {this.state.counter}
              </Text>
              <Modal
                animationType='slide'
                transparent={true}
                visible={this.state.invisible}
                onRequestClose={() => this.setState({ invisible: !this.state.invisible })}
              >
                <View style={styles.modal}>
                  <View>
                    <Text style={styles.modalTitle}>Workout Information</Text>
                  </View>
                  <View style={styles.modalIcon}>
                    <Image
                      source={{ uri: selectedInfo.icon }}
                      style={styles.modalImage}
                      resizeMode={'stretch'}
                    />
                    <Text style={styles.modalTitleIcon}>{selectedInfo.title}</Text>
                  </View>
                  <View style={styles.modalDescription}>
                    <Text>{selectedInfo.description}</Text>
                  </View>
                  <View style={styles.buttonsSection}>
                    <Button
                      bordered
                      small
                      transparent
                      onPress={() => this.setState({ invisible: !this.state.invisible })}
                    >
                      <Text>OK</Text>
                    </Button>
                  </View>
                </View>
              </Modal>
            </View>
            <SlidingUpPanel
              visible
              showBackdrop={false}
              ref={(c) => { this._panel = c }}
              draggableRange={this.props.draggableRange}
              style={{ flex: 1 }}>
              <SlidingUpModalMenu
                buttonStatus={buttonStatus}
                buttonSaveStatus={buttonSaveStatus}
                timerReset={timerReset}
                timerStart={timerStart}
                saveProgress={() => saveProgress()}
                getFormattedTime={getFormattedTime}
                toggleTimer={toggleTimer}
                resetTimer={resetTimer}
                handleTimerComplete={handleTimerComplete}
              />
            </SlidingUpPanel>
          </View>

        </DrawerLayoutAndroid>
      </DrawerLayoutAndroid>
    );
  }

  _renderItem(item) {
    return (
      <View style={styles.renderItem}>
        <TouchableOpacity onPress={() => this.onMenuPressed(item)} style={{ flex: 5 }}>
          <View style={styles.item}>
            <Image
              source={{ uri: item.icon }}
              style={styles.imageContainer}
              resizeMode={'stretch'} />
            <Text style={styles.actionText}>{item.title}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.onInfoPressed(item)} style={styles.iconInformation}>
          <Icon name='info' style={{ fontSize: 20 }} />
        </TouchableOpacity>
      </View>
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
            <Text style={styles.totalText}>{item.total} times</Text>
            <Text style={styles.totalText}>{item.createdAt.toLocaleString()}</Text>
            <Text style={styles.totalText}>{item.timeElapsed}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const handleTimerComplete = () => alert("Workout complete");


AppRegistry.registerComponent('Motio', () => App);
