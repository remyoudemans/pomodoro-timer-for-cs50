import React from 'react'
import { Text } from 'react-native'
import PropTypes from 'prop-types'

import { TIMER_TYPES } from '../utils/constants'

export const TimerEmoji = ({ timerIsWork, keyboardIsOpen }) => (
  <Text style={{ fontSize: 60, bottom: keyboardIsOpen ? 20 : 40 }}>
    {timerIsWork ? '🤓' : '😎' }
  </Text>
)

TimerEmoji.propTypes = {
  timerIsWork: PropTypes.bool.isRequired,
  keyboardIsOpen: PropTypes.bool.isRequired
}
