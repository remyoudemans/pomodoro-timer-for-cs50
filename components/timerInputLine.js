import React from 'react'
import { Text, TextInput, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

import { FlexWrap } from './flexWrap'

export const TimerInputLine = ({
  timerName,
  setTimer,
  timerValues,
}) => (
  <FlexWrap style={{ paddingTop: 30 }}>
    <Text style={{ paddingRight: 30, fontWeight: 'bold' }}>{ timerName } time:</Text>
    <Text>mins: </Text>
    <TextInput
      style={styles.numericInput}
      keyboardType='number-pad'
      value={(timerValues.minutes || '').toString()}
      placeholder='0'
      onChangeText={text => {
        if (Number(text) > 60) {
          return
        }
        setTimer({
          minutes: Number(text) || 0,
        })
      }}
    />
    <Text style={{ paddingLeft: 15}}> secs: </Text>
    <TextInput
      style={styles.numericInput}
      keyboardType='number-pad'
      value={(timerValues.seconds || '').toString()}
      placeholder='0'
      onChangeText={text => {
        if (Number(text) > 59) {
          return
        }
        setTimer({
          seconds: Number(text) || 0,
        })
      }}
    />
  </FlexWrap>
)

TimerInputLine.propTypes = {
  timerName: PropTypes.string.isRequired,
  setTimer: PropTypes.func.isRequired,
  timerValues: PropTypes.objectOf(PropTypes.number).isRequired,
}

const styles = StyleSheet.create({
  numericInput: {
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 1,
    width: 30,
    borderRadius: 3,
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 2,
    bottom: 2
  }
})
