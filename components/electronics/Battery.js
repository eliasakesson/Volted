import React, { useEffect } from 'react'
import { View, StyleSheet, Text } from 'react-native'

export default function Battery(props) {

    useEffect(() => {
        props.receiver1?.forEach((message) => {
            console.log("Battery: ", message)
        })
    }, [props.receiver1])

    useEffect(() => {
        const interval = setInterval(() => {
            props.sender2?.send(1)
        }, 100)

        return () => clearInterval(interval)
    }, [props.sender2])

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
        width: 100,
        height: 40,
        borderRadius: 10,
        overflow: 'hidden',
        flexDirection: 'row',
        zIndex: 5,
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