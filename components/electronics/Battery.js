import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text } from 'react-native'

export default function Battery(props) {

    const [id] = useState(Math.random())
    const [circuitClosed, setCircuitClosed] = useState(false)

    useEffect(() => {
        const { channel1, channel2 } = props

        channel1?.subscribe({callback: (message) => {
            console.log("Battery: ", message)
            if (message.sender !== id) {
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
            channel2?.send({test: true, sender: id})
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
    </View>
  )
}

const styles = StyleSheet.create({
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
        flex: 2,
        backgroundColor: 'darkslategrey',
        justifyContent: 'center',
        paddingLeft: 10,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
    },
    positive: {
        flex: 1,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
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