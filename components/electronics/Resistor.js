import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

export default function Resistor(props) {

  const colors = {svag: ["brown", "black", "red", "red"], medel: ["red", "red", "orange", "orange"], stark: ["red", "red", "red", "orange"]}

  const color = colors[props.strength.toLowerCase()]

  return (
    <View style={styles.resistor}>
      <View style={[styles.ring, {backgroundColor: color[0]}]}></View>
      <View style={[styles.ring, {backgroundColor: color[1]}]}></View>
      <View style={[styles.ring, {backgroundColor: color[2]}]}></View>
      <View style={[styles.ring, {backgroundColor: color[3]}]}></View>
      <View style={[styles.ring, {backgroundColor: "gold", marginLeft: 30}]}></View>
      <Text style={styles.text}>{props.strength}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    resistor: {
      width: 90,
      height: 40,
      backgroundColor: '#484848',
      borderRadius: 10,
      overflow: 'hidden',
      flexDirection: 'row',
      justifyContent: 'center',
      zIndex: 5,
      borderColor: 'black',
      borderWidth: 2,
    },
    ring: {
      width: 4,
      height: "100%",
      marginHorizontal: 3,
    },
    text: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      marginTop: 10,
      textAlign: 'center',
      textAlignVertical: 'center',
      color: '#eee',
      fontSize: 15,
      fontWeight: 'bold',
    }
})