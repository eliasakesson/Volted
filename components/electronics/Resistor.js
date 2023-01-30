import React from 'react'
import { View, StyleSheet } from 'react-native'

export default function Resistor() {
  return (
    <View style={styles.resistor}>
        <View style={[styles.ring, {backgroundColor: "brown"}]}></View>
        <View style={[styles.ring, {backgroundColor: "black"}]}></View>
        <View style={[styles.ring, {backgroundColor: "red"}]}></View>
        <View style={[styles.ring, {backgroundColor: "red"}]}></View>
        <View style={[styles.ring, {backgroundColor: "gold", marginLeft: 30}]}></View>
    </View>
  )
}

const styles = StyleSheet.create({
    resistor: {
        width: 100,
        height: 40,
        backgroundColor: '#383838',
        borderRadius: 10,
        overflow: 'hidden',
        flexDirection: 'row',
        justifyContent: 'center',
        zIndex: 5,
    },
    ring: {
        width: 5,
        height: "100%",
        marginHorizontal: 8,
    }
})