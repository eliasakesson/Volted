import React, { useContext, useEffect, useRef, useState } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { SandboxContext } from '../contexts'

export default function Battery(props) {

    const [id] = useState(Number((Math.random()).toFixed(6) * 1e6))
    const { isDragging } = useContext(SandboxContext)
    const [circuitClosed, setCircuitClosed] = useState(false)
    const circuitClosedRef = useRef(circuitClosed)
    const timeoutRef = useRef();

    useEffect(() => {
        if (props.disabled) return

        const { channel1, channel2 } = props

        channel1?.subscribe({callback: (message) => {
            if (channel1 && channel2){
                console.log("Battery: ", message.sender)
                if (message.volt === 0 && !circuitClosedRef.current) {
                    setCircuitClosed(true)
                }
    
                // If no signal is received for 600ms, the circuit is considered closed
                clearTimeout(timeoutRef.current);
                timeoutRef.current = setTimeout(() => {
                    setCircuitClosed(false);
                    // Clear interval ID reference
                    timeoutRef.current = undefined;
                }, 600);
            }
        }, subscriber: id})

        const interval = setInterval(() => {
            // if (circuitClosedRef.current) {
            //     channel2?.send({volt: 1, sender: [id]})
            // } else {
            //     channel2?.send({volt: 0, sender: [id]})
            // }
            if (channel1 && channel2){
                channel2.send({volt: 1, sender: [id]})
            }
        }, 500)

        return () => {
            console.log("Battery unmounted")
            clearInterval(interval)
            // channel1?.unsubscribe(id)
        }
    }, [props.channel1, props.channel2])

    useEffect(() => {
        circuitClosedRef.current = circuitClosed
    }, [circuitClosed])

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