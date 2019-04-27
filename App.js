import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

const TIMER_TYPES = {
  work: 'work',
  break: 'break'
}

export default class App extends React.Component {
  state = {
    isPaused: false,
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
      const otherTimerType = timerType === TIMER_TYPES.work
        ? TIMER_TYPES.break
        : TIMER_TYPES.work

      const otherTimerValues = this.state[otherTimerType]

      this.setState({
        timerType: otherTimerType,
        currentTimer: otherTimerValues
      })

      console.log("We're done!")
    }

    else {
      const newMinutes = seconds === 0
        ? minutes - 1
        : minutes
      
      const newSeconds = seconds === 0
        ? 59
        : seconds - 1

      this.setState({
        currentTimer: {
          minutes: newMinutes,
          seconds: newSeconds
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

  render() {
    const { isPaused, timerType } = this.state
    const { minutes, seconds } = this.state.currentTimer
    const { [TIMER_TYPES.work]: workTimer, [TIMER_TYPES.break]: breakTimer } = this.state
    return (
      <View style={styles.container}>
        <Text>{ timerType === TIMER_TYPES.work ? 'WORK' : 'BREAK'} TIMER</Text>
        <Text>{minutes || '0'}:{seconds < 10 ? `0${seconds}` : seconds}</Text>
        <View>
          <Button onPress={isPaused ? this.continue : this.pause} title={ isPaused ? 'Start' : 'Pause' }/>
          <Button onPress={this.reset} title='Reset' />
        </View>
        <TextInput
          keyboardType='number-pad'
          value={workTimer.minutes.toString()}
          onChangeText={text => {
            this.setState({
              [TIMER_TYPES.work]: {
                minutes: Number(text) || 0,
                seconds: workTimer.seconds
              }
            }, this.reset)
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
