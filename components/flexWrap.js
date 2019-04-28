import React from 'react'
import { View, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

export const FlexWrap = ({ children, style }) => (
  <View style={{ ...styles.flexWrap, ...style }}>
    { children }
  </View>
)

FlexWrap.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element)
}

const styles = StyleSheet.create({
 flexWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  }
})
