import React from 'react';
import { Keyboard, View, KeyboardAvoidingView, ScrollView, Button, StyleSheet } from 'react-native'

import { vibrate, mod } from './utils'
import { TIMER_TYPES } from './utils/constants'
import { TimeDisplay, TimerTitle, TimerEmoji, FlexWrap, TimerInputLine, H1 } from './components'


export default class App extends React.Component {
  state = {
    isPaused: false,
    keyboardIsOpen: false,
    timerType: TIMER_TYPES.work,
    currentTimer: {
      minutes: 25,
      seconds: 0
    },
    [TIMER_TYPES.break]: {
      minutes: 5,
      seconds: 0
    },
    [TIMER_TYPES.work]: {
      minutes: 25,
      seconds: 0
    }
  }

  timer = undefined;

  decrementTime = () => {
    const { timerType } = this.state
    const { minutes, seconds } = this.state.currentTimer

    if (minutes === 0 && seconds === 0) {
      vibrate()
      const otherTimerType = timerType === TIMER_TYPES.work
        ? TIMER_TYPES.break
        : TIMER_TYPES.work

      const otherTimerValues = this.state[otherTimerType]

      this.setState({
        timerType: otherTimerType,
        currentTimer: otherTimerValues
      })
    }

    else {

      const newMinutes = seconds === 0
        ? minutes - 1
        : minutes
      
      this.setState({
        currentTimer: {
          minutes: newMinutes,
          seconds: mod(seconds - 1, 60)
        }
      })
    }
  }

  stopTimer = () => {
    clearInterval(this.timer)
  }

  startTimer = () => {
    this.timer = setInterval(this.decrementTime, 1000)
  } 

  componentDidMount() {
    this.startTimer()
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => this.setKeyboardIsOpen(true)
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => this.setKeyboardIsOpen(false)
    );
  }

  pause = () => {
    this.stopTimer()
    this.setState({ isPaused: true })
  }

  continue = () => {
    this.startTimer()
    this.setState({ isPaused: false })
  }

  reset = () => {
    const { timerType } = this.state
    const newTimer = this.state[timerType]
    this.pause()
    this.setState({
      currentTimer: newTimer
    })
  }

  setKeyboardIsOpen = keyboardIsOpen => {
    this.setState({ keyboardIsOpen })
  }

  render() {
    const { isPaused, timerType, keyboardIsOpen } = this.state
    const { minutes, seconds } = this.state.currentTimer
    const { [TIMER_TYPES.work]: workTimer, [TIMER_TYPES.break]: breakTimer } = this.state

    const timerIsWork = timerType === TIMER_TYPES.work

    return (
      <ScrollView scrollEnabled={false} contentContainerStyle={getContainerStyles(timerType)}>
        <KeyboardAvoidingView behavior='padding' style={getContainerStyles(timerType)}>
        <TimerEmoji timerIsWork={timerIsWork} keyboardIsOpen={keyboardIsOpen} />
        <TimerTitle timerIsWork={timerIsWork} />
        <TimeDisplay minutes={minutes} seconds={seconds} />
        <FlexWrap>
          <Button onPress={isPaused ? this.continue : this.pause} title={ isPaused ? 'Start' : 'Pause' }/>
          <Button onPress={this.reset} title='Reset' />
        </FlexWrap>
        <TimerInputLine
          timerName='Work'
          setTimer={minutesAndSeconds => {
            this.setState({
              [TIMER_TYPES.work]: {
                ...this.state[TIMER_TYPES.work],
                ...minutesAndSeconds
              }
            }, this.reset)
          }}
          timerValues={workTimer}
        />
        <TimerInputLine
          timerName='Break'
          setTimer={minutesAndSeconds => {
            this.setState({
              [TIMER_TYPES.break]: {
                ...this.state[TIMER_TYPES.break],
                ...minutesAndSeconds
              }
            }, this.reset)
          }}
          timerValues={breakTimer}
        />
      </KeyboardAvoidingView>
    </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffeeed',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const getContainerStyles = timerType => {
  const extraStyles = timerType === TIMER_TYPES.break
    ? { backgroundColor: 'lightblue' }
    : {}
  return {
    ...styles.container,
    ...extraStyles
  }
}
