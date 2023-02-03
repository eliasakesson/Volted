import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native'
import data from '../tutorials/Enkel-lampa.json'
import { Stringify } from '../Helpers'
import { colors } from '../colors'

export default function TutorialScreen({ navigation }) {

  return (
    <View style={styles.container}>
        <View style={styles.top}>
            <Image style={styles.image} source={{uri: data.image}} />
        </View>
        <View style={styles.bottom}>
            <Text style={styles.title}>{Stringify(data.header)}</Text>
            <Text style={styles.description}>{Stringify(data.info)}</Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Sandbox", { data })}>
                <Text style={styles.buttonText}>Starta</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bg,
        padding: 50,
        paddingBottom: 100,
    },
    top: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 200,
        height: 200,
    },
    bottom: {
        flex: 1,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        color: colors.header,
    },
    description: {
        fontSize: 16,
        marginBottom: 20,
        color: colors.text,
    },
    button: {
        backgroundColor: colors.primary,
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: "auto",
    },
    buttonText: {
        color: "white",
    },
})