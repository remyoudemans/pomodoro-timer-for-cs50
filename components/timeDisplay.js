import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'

import { H1 } from './h1'

export const TimeDisplay = ({ minutes, seconds }) => (
  <H1 style={getStyles(minutes)}>{minutes || '0'}:{seconds < 10 ? `0${seconds}` : seconds}</H1>
)

TimeDisplay.propTypes = {
  minutes: PropTypes.number.isRequired,
  seconds: PropTypes.number.isRequired
}

const getStyles = minutes => {
  const extraStyles = minutes < 10
    ? { paddingLeft: 20 }
    : {}
  return {
    ...styles.clockBox,
    ...extraStyles
  }
}

const styles = StyleSheet.create({
  clockBox: {
    width: 112,
    borderStyle: 'solid',
    borderWidth: 2,
    borderRadius: 6,
    padding: 10,
    paddingBottom: 10,
    marginBottom: 20
  }
})
