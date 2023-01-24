import React from 'react'
import ElectricComponent from '../ElectricComponent'
import { View, StyleSheet } from 'react-native'

export default function Resistor() {
  return (
    <ElectricComponent>
        <View style={styles.resistor}>
            <View style={[styles.ring, {backgroundColor: "brown"}]}></View>
            <View style={[styles.ring, {backgroundColor: "black"}]}></View>
            <View style={[styles.ring, {backgroundColor: "red"}]}></View>
            <View style={[styles.ring, {backgroundColor: "gold", marginLeft: 20}]}></View>
        </View>
    </ElectricComponent>
  )
}

const styles = StyleSheet.create({
    resistor: {
        width: 100,
        height: 50,
        backgroundColor: 'lightgrey',
        borderRadius: 10,
        overflow: 'hidden',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    ring: {
        width: 5,
        height: "100%",
        marginHorizontal: 5,
    }
})