import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function ElectricComponent(props) {
  return (
    props.children
  )
}

const styles = StyleSheet.create({
    component: {
      width: 100,
      height: 50,
      backgroundColor: 'black',
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center'
    }
  })
