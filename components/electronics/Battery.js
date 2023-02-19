import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text } from 'react-native'

export default function Battery(props) {

    const [id] = useState(Math.random())

    useEffect(() => {
        const { channel1, channel2 } = props

        channel1?.subscribe({callback: (message) => {
            console.log("Battery: ", message)
        }, subscriber: id})

        const interval = setInterval(() => {
            channel2?.send({volt: 1, sender: id})
        }, 1000)

        return () => {
            channel1?.unsubscribe(id)
            channel2?.unsubscribe(id)
            clearInterval(interval)
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
    </View>
  )
}

const styles = StyleSheet.create({
    battery: {
        width: 90,
        height: 40,
        borderRadius: 10,
        overflow: 'hidden',
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
    },
    positive: {
        flex: 1,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
    }
})