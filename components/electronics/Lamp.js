import React, { useEffect, useState } from 'react'
import { useRef } from 'react'
import { View, StyleSheet, Text } from 'react-native'

export default function Lamp(props) {

    const [id] = useState(Math.random())

    const [lightActive, setLightActive] = useState(false)

    useEffect(() => {
        const { channel1, channel2 } = props

        channel1?.subscribe({callback: (message) => {
            console.log("Lamp: ", message)
            if (message.sender !== id) {
                channel2?.send({...message, sender: id})
            }
            
            setLightActive(true)
        }, subscriber: id})

        channel2?.subscribe({callback: (message) => {
            console.log("Lamp: ", message)
            if (message.sender !== id) {
                channel1?.send({...message, sender: id})
            }
            
            setLightActive(true)
        }, subscriber: id})

        return () => {
            channel1?.unsubscribe(id)
            channel2?.unsubscribe(id)
        }
    }, [props.channel1, props.channel2])

    useEffect(() => {
        if (lightActive) {
            const interval = setInterval(() => {
                setLightActive(false)
            }, 600)

            return () => {
                clearInterval(interval)
            }
        }
    }, [lightActive])

    const disableLight = () => {
        setLightActive(false)
    }

  return (
    <View style={styles.lampBase}>
        <View style={[styles.lamp, {backgroundColor: lightActive ? "yellow" : "grey"}]}></View>
    </View>
  )
}

const styles = StyleSheet.create({
    lampBase: {
        width: 140,
        height: 40,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 5,
        backgroundColor: 'darkslategrey',
        borderColor: 'black',
        borderWidth: 2,
    },
    lamp: {
        height: 50,
        width: 50,
        borderRadius: 30,
        borderWidth: 2,
        borderColor: 'black',
    }
})