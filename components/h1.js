import React from 'react'
import { Text, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

export const H1 = ({ children, style = {} }) => (
  <Text style={{ ...styles.h1, ...style }}>{ children }</Text>
)

const styles = StyleSheet.create({
  h1: {
    fontSize: 30,
    fontWeight: 'bold',
    paddingBottom: 30
  }
})
