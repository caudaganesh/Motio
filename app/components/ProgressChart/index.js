import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  processColor
} from 'react-native';
import update from 'immutability-helper';

import _ from 'lodash';
import {LineChart} from 'react-native-charts-wrapper';

class ProgressChart extends React.Component {

  constructor() {
    super();

    this.state = {
      data: {},
      legend: {
        enabled: true,
        textColor: processColor('black'),
        textSize: 12,
        position: 'BELOW_CHART_RIGHT',
        form: 'SQUARE',
        formSize: 14,
        xEntrySpace: 10,
        yEntrySpace: 5,
        formToTextSpace: 5,
        wordWrapEnabled: true,
        maxSizePercent: 0.5,
        custom: {
          colors: [processColor('black')],
          labels: ['WORKOUT PROGRESS',]
        }
      },
      marker: {
        enabled: true,
        markerColor: processColor('#F0C0FF8C'),
        textColor: processColor('white'),
        markerFontSize: 14,
      },

      selectedEntry: ""
    }

  }

  componentDidMount() {
    const size = 80;

    this.setState(
      update(this.state, {
        data: {
          $set: {
            dataSets: [{
              values:this.props.dataSet,

              label: 'user',
              config: {
                lineWidth: 1,
                drawValues: true,
                circleRadius: 5,
                highlightEnabled: true,
                drawHighlightIndicators: true,
                color: processColor('black'),
                drawFilled: true,
                valueTextSize:10,
                fillColor: processColor('black'),
                fillAlpha: 45,
                valueFormatter: "###",
                circleColor: processColor('red')
              }
            }],
          }
        }
      })
    );
  }

  
  componentWillReceiveProps(nextProps) {
    console.log("propssssssssssss", this.props.dataSet)
    const size = 80;
    if(this.props.dataSet) {

        this.setState(
          update(this.state, {
            data: {
              $set: {
                dataSets: [{
                  values:this.props.dataSet,
    
                  label: 'user',
                  config: {
                    lineWidth: 1,
                    drawValues: true,
                    circleRadius: 5,
                    highlightEnabled: true,
                    drawHighlightIndicators: true,
                    color: processColor('black'),
                    drawFilled: true,
                    valueTextSize:10,
                    fillColor: processColor('black'),
                    fillAlpha: 45,
                    valueFormatter: "###",
                    circleColor: processColor('red')
                  }
                }],
              }
            }
          })
        );
    }    
  }
  

  _randomParabolaValues(size: number) {
    return _.times(size, (index) => {
      return {x: index, y: index * index}
    });
  }

  handleSelect(event) {
    let entry = event.nativeEvent
    if (entry == null) {
      this.setState({...this.state, selectedEntry: null})
    } else {
      this.setState({...this.state, selectedEntry: JSON.stringify(entry)})
    }
  }

  render() {
    console.log("aaaaaaaas")
    let borderColor = processColor("black");
    return (
      <View style={{flex: 1}}>

        {/* <View style={{height:80}}>
          <Text> selected entry</Text>
          <Text> {this.state.selectedEntry}</Text>
        </View> */}

        <View style={{backgroundColor:'transparent', flex:1}}>


          <LineChart
            style={styles.chart}
            data={this.state.data}
            chartDescription={{text: ''}}
            legend={this.state.legend}
            marker={this.state.marker}

            drawGridBackground={false}

            borderColor={borderColor}
            borderWidth={1}
            drawBorders={true}

            touchEnabled={true}
            dragEnabled={true}
            scaleEnabled={true}
            scaleXEnabled={true}
            scaleYEnabled={true}
            pinchZoom={true}
            doubleTapToZoomEnabled={false}

            dragDecelerationEnabled={true}
            dragDecelerationFrictionCoef={0.99}
            //yAxis={{left:{axisMaximum:12000}}}

            keepPositionOnRotation={false}

            xAxis={{position:'BOTTOM'}}

            onSelect={this.handleSelect.bind(this)}

          />
        </View>
      </View>


    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  chart: {
      backgroundColor:'transparent',
    flex: 1
  }
});


export default ProgressChart;