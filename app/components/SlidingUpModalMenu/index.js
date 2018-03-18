import React, { Component } from "react"
import { View } from 'react-native'
import { Button, Text } from 'native-base'
import { Stopwatch } from 'react-native-stopwatch-timer'
import PropTypes from 'prop-types'
import styles from './styles'

import { options } from './constants'


export default class SlidingUpModalMenu extends Component {

    render() {
        const {
            buttonStatus,
            buttonSaveStatus,
            timerReset,
            timerStart,
            saveProgress,
            getFormattedTime,
            toggleTimer,
            resetTimer,
            handleTimerComplete
        } = this.props
        return (
            <View style={styles.panel}>
                <View style={styles.panelHeader}>
                    <Stopwatch
                        start={timerStart}
                        msecs={false}
                        reset={timerReset}
                        options={options}
                        handleFinish={handleTimerComplete}
                        getTime={getFormattedTime} />
                </View>
                <View style={styles.panelContainer}>
                    <Button
                        transparent dark
                        small
                        onPress={toggleTimer}
                        disabled={buttonStatus}
                        style={styles.button}
                    >
                        <Text style={styles.textButton}>{!timerStart ? "START" : "STOP"}</Text>
                    </Button>
                    <Button
                        transparent dark
                        small
                        onPress={resetTimer}
                        disabled={buttonStatus}
                        style={styles.button}
                    >
                        <Text style={styles.textButton}>RESET</Text>
                    </Button>
                    <Button
                        transparent dark
                        small
                        onPress={() => saveProgress()}
                        disabled={buttonSaveStatus}
                        style={styles.button}
                    >
                        <Text style={styles.textButton}>SAVE PROGRESS</Text>
                    </Button>
                </View>
            </View>
        )
    }
}

SlidingUpModalMenu.propTypes = {
    buttonStatus: PropTypes.bool,
    buttonSaveStatus: PropTypes.bool,
    timerReset: PropTypes.bool,
    timerStart: PropTypes.bool,
    saveProgress: PropTypes.func,
    getFormattedTime: PropTypes.func,
    toggleTimer: PropTypes.func,
    resetTimer: PropTypes.func,
    handleTimerComplete: PropTypes.func
}