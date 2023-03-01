import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

export default function Resistor(props) {

  const colors = {svag: ["red", "red", "#8B4513"], medel: ["#8B4513", "#000000", "red"], stark: ["#8B4513", "#000000", "#FF8C00"]}

  const color = colors[props.strength.toLowerCase()]

  return (
    <View style={styles.resistor}>
      <View style={styles.resistorCornerLeft}>
        <View style={[styles.resistorCornerTipLeft, {backgroundColor: color[0]}]}></View>
      </View>
      <View style={styles.resistorCornerRight}>
        <View style={[styles.resistorCornerTipRight, {backgroundColor: color[2]}]}></View>
      </View>
      <View style={[styles.resistorCenter, {backgroundColor: color[1]}]}></View>
    </View>
  )

  return (
    <View style={oldStyles.resistor}>
      <View style={[oldStyles.ring, {backgroundColor: color[0]}]}></View>
      <View style={[oldStyles.ring, {backgroundColor: color[1]}]}></View>
      <View style={[oldStyles.ring, {backgroundColor: color[2]}]}></View>
      <View style={[oldStyles.ring, {backgroundColor: color[3]}]}></View>
      <View style={[oldStyles.ring, {backgroundColor: "gold", marginLeft: 30}]}></View>
      <Text style={oldStyles.text}>{props.strength}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  resistor: {
    width: 90,
    height: 34,
    marginTop: 3,
    backgroundColor: '#DB9B7C',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'black',
  },
  resistorCornerLeft: {
    width: 30,
    height: 40,
    backgroundColor: '#DB9B7C',
    borderRadius: 10,
    position: 'absolute',
    top: -5,
    left: -2,
    borderColor: 'black',
    borderWidth: 2,
    borderRightWidth: 0,
    overflow: 'hidden',
  },
  resistorCornerRight: {
    width: 30,
    height: 40,
    backgroundColor: '#DB9B7C',
    borderRadius: 10,
    position: 'absolute',
    top: -5,
    right: -2,
    borderColor: 'black',
    borderWidth: 2,
    borderLeftWidth: 0,
    overflow: 'hidden',
  },
  resistorCornerTipLeft: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: 15,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    backgroundColor: '#FF4444',
  },
  resistorCornerTipRight: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: 15,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    backgroundColor: '#8B4513',
  },
  resistorCenter: {
    position: 'absolute',
    top: 0,
    left: 33,
    width: 20,
    height: 30,
    backgroundColor: '#FF4444',
  },
})

const oldStyles = StyleSheet.create({
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