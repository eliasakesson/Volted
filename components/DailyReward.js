import React, { useState, useRef, useEffect } from 'react'
import { View, Text, StyleSheet,Animated } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { colors } from '../colors'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DailyReward() {

    const [show, setShow] = useState(false)
    const [existInDOM, setExistInDOM] = useState(false)

    const scale = useRef(new Animated.Value(0)).current

    const openReward = () => {
        setShow(true)
        AsyncStorage.setItem("lastDailyReward", new Date().toString())
    }

    useEffect(() => {
        AsyncStorage.getItem("lastDailyReward").then((data) => {
            if (data) {
                const lastReward = new Date(data)
                const today = new Date()
                if (lastReward.getDate() !== today.getDate()) {
                    openReward()
                }
            } else {
                openReward()
            }
        }).catch((e) => {
            console.log(e)
        })
    }, [])

    useEffect(() => {
        if (show) {
            setExistInDOM(true)
            Animated.timing(scale, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }).start()
        } else {
            Animated.timing(scale, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true
            }).start(() => setExistInDOM(false))
        }
    }, [show])

    if (!existInDOM) return null

  return (
    <Animated.View style={[styles.container, {transform: [{translateX: -150}, {translateY: -200}, {scale: scale}]}]}>
        <Text style={styles.title}>Välkommen tillbaka</Text>
        <Text style={styles.text}>Här är din dagliga belöning, kom tillbaka imorgon för en ny belöning</Text>
        <Text style={styles.coinsText}><Text style={styles.coins}>+20</Text> poäng</Text>
        <TouchableOpacity style={styles.button} onPress={() => setShow(false)}>
            <Text style={styles.buttonText}>Ta emot</Text>
        </TouchableOpacity>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: "50%",
        left: "50%",
        width: 300,
        height: 400,
        backgroundColor: 'white',
        borderRadius: 10,
        zIndex: 100,
        borderColor: colors.border,
        borderWidth: 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 0.1,

        flexDirection: 'column',
        alignItems: 'center',
        paddingHorizontal: 25,
        paddingVertical: 40,
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        color: colors.text,
        marginBottom: 20,
    },
    text: {
        fontSize: 16,
        color: colors.text,
    },
    coinsText: {
        fontSize: 30,
        color: colors.text,
        marginTop: 50,
    },
    coins: {
        fontSize: 40,
        fontWeight: 'bold',
        color: colors.text,
    },
    button: {
        width: 250,
        height: 50,
        backgroundColor: colors.primary,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 70,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    }
})