import React, { useContext, useEffect, useState } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { SandboxContext } from '../contexts'

export default function Resistor(props) {

  const [id] = useState(Math.random())
  const { isDragging } = useContext(SandboxContext)

  const colors = {svag: ["red", "red", "#8B4513"], medel: ["#8B4513", "#000000", "red"], stark: ["#8B4513", "#000000", "#FF8C00"]}

  const color = colors[props.strength.toLowerCase()]
  const resistance = {svag: 1/2, medel: 1/4, stark: 1/8}[props.strength.toLowerCase()]

  useEffect(() => {
    const { channel1, channel2 } = props

    channel1?.subscribe({callback: (message) => {
        if (message.sender !== id) {
          const { volt } = message
          channel2?.send({...message, sender: id, volt: volt * resistance})
        }
    }, subscriber: id})

    channel2?.subscribe({callback: (message) => {
        if (message.sender !== id) {
          const { volt } = message
          channel1?.send({...message, sender: id, volt: volt * resistance})
        }
    }, subscriber: id})
  }, [props.channel1, props.channel2])

  return (
    <View style={styles.resistor}>
      <View style={styles.resistorCornerLeft}>
        <View style={[styles.resistorCornerTipLeft, {backgroundColor: color[0]}]}></View>
      </View>
      <View style={styles.resistorCornerRight}>
        <View style={[styles.resistorCornerTipRight, {backgroundColor: color[2]}]}></View>
      </View>
      <View style={[styles.resistorCenter, {backgroundColor: color[1]}]}></View>
      {!props.disabled && isDragging && <>
        <View style={[styles.dropCircle, {left: 5}]}></View>
        <View style={[styles.dropCircle, {right: 5}]}></View>
      </>}
    </View>
  )
}

const styles = StyleSheet.create({
  dropCircle: {
    height: 25,
    width: 25,
    borderRadius : 12.5,
    borderStyle: 'dashed',
    borderWidth: 1, 
    borderColor: '#ffffffcc',
    position: 'absolute',
  },
  resistor: {
    width: 90,
    height: 34,
    marginTop: 3,
    backgroundColor: '#DB9B7C',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'black',
    justifyContent: 'center',
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