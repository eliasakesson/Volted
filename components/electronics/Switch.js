import React, { useContext, useEffect, useRef, useState } from 'react'
import { View, StyleSheet, Text, TouchableWithoutFeedback, TouchableHighlight } from 'react-native'
import { SandboxContext } from '../contexts'

export default function Resistor(props) {

  const [id] = useState(Number((Math.random()).toFixed(6) * 1e6))
  const { isDragging } = useContext(SandboxContext)

  const [closed, setClosed] = useState(false)
  const closedRef = useRef(closed)

  useEffect(() => {
    const { channel1, channel2 } = props

    channel1?.subscribe({callback: (message) => {
        if (message.sender.indexOf(id) === -1 && closedRef.current && channel1 && channel2) {
          channel2?.send({...message, sender: [...message.sender, id]})
        }
    }, subscriber: id})

    channel2?.subscribe({callback: (message) => {
        if (message.sender.indexOf(id) === -1 && closedRef.current && channel1 && channel2) {
          channel1?.send({...message, sender: [...message.sender, id]})
        }
    }, subscriber: id})

    return () => {
      channel1?.unsubscribe(id)
      channel2?.unsubscribe(id)
    }
  }, [props.channel1, props.channel2])

  useEffect(() => {
    closedRef.current = closed
  }, [closed])

  const handlePress = () => {
    if (props.disabled) return
    props.preventGesturePropagation()
    setClosed(closed => !closed)
  }

  return (
    <View style={styles.switch}>
      <TouchableHighlight onPress={handlePress} disabled={props.disabled}>
        <View style={styles.button}>
          <View style={[styles.lamp, {backgroundColor: closed ? "green" : "red"}]}></View>
          <Text style={{textAlign: 'center', color: 'white'}}>{closed ? "On" : "Off"}</Text>
        </View>
      </TouchableHighlight>
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
  switch: {
    width: 140,
    height: 40,
    backgroundColor: '#777',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    height: 40,
    width: 60,
    borderRadius: 5,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 2,
    flexDirection: 'row',
  },
  lamp: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: 'red',
    marginRight: 5,
  },
})