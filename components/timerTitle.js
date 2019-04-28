import React from 'react'
import PropTypes from 'prop-types'

import { H1 } from './h1'

export const TimerTitle = ({ timerIsWork }) => {
  const styles = timerIsWork
    ? { textTransform: 'uppercase' }
    : { textTransform: 'lowercase' }

  const timerName = `${timerIsWork ? 'work' : 'break'} timer`

  return (
    <H1 style={styles}>{timerName}</H1>
  )
}

TimerTitle.propTypes = {
  timerIsWork: PropTypes.bool.isRequired
}
