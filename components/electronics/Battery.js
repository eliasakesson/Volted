import React, { useContext, useEffect, useState } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { SandboxContext } from '../contexts'

export default function Battery(props) {

    const [id] = useState(Math.random())
    const { isDragging } = useContext(SandboxContext)
    const [circuitClosed, setCircuitClosed] = useState(false)

    useEffect(() => {
        if (props.disabled) return

        const { channel1, channel2 } = props

        channel1?.subscribe({callback: (message) => {
            if (message.sender !== id) {
                console.log("Battery: ", message, circuitClosed)
                if (message.test) {
                    setCircuitClosed(true)
                }
            }
        }, subscriber: id})

        const interval = setInterval(() => {
            if (circuitClosed) {
                channel2?.send({volt: 1, sender: id})
            }
        }, 500)

        const testerInterval = setInterval(() => {
            if (!circuitClosed) {
                channel2?.send({test: true, sender: id})
            }
        }, 500)

        return () => {
            clearInterval(interval)
            clearInterval(testerInterval) 
        }
    }, [props.channel1, props.channel2])

  return (
    <View style={styles.battery}>
        <View style={styles.negative}>
            <Text style={{color: 'white'}}>-</Text>
        </View>
        <View style={styles.positive}>
            <Text style={{color: 'white'}}>+</Text>
        </View>
        <View style={styles.top}></View>
        {!props.disabled && isDragging && <>
            <View style={[styles.dropCircle, {top: 5, left: 5}]}></View>
            <View style={[styles.dropCircle, {top: 5, right: 5}]}></View>
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
    battery: {
        width: 90,
        height: 40,
        borderRadius: 10,
        flexDirection: 'row',
        zIndex: 5,
        borderColor: 'black',
        borderWidth: 2,
    },
    negative: {
        flex: 3,
        backgroundColor: 'darkslategrey',
        justifyContent: 'center',
        paddingLeft: 14,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
    },
    positive: {
        flex: 2,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 4,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
    },
    top: {
        position: 'absolute',
        top: 7,
        right: -8,
        width: 8,
        height: 20,
        backgroundColor: 'darkslategrey',
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
    }
})