import React, { useState, useRef, useEffect } from 'react'
import { View, Text, StyleSheet,Animated } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { colors } from '../colors'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';

export default function DailyReward() {

    const [existInDOM, setExistInDOM] = useState(false)

    const scale = useRef(new Animated.Value(0)).current

    const openReward = () => {
        AsyncStorage.setItem("lastDailyReward", new Date().toString())
        setExistInDOM(true)
        addMoney()
        Animated.timing(scale, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start()
    }

    const addMoney = () => {
        AsyncStorage.getItem("money").then((data) => {
            if (data) {
                const money = parseInt(data)
                AsyncStorage.setItem("money", (money + 100).toString())
            } else {
                AsyncStorage.setItem("money", "100")
            }
        }).catch((e) => {
            console.log(e)
        })
    }

    const acceptReward = () => {
        Animated.timing(scale, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true
        }).start(() => setExistInDOM(false))
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

    if (!existInDOM) return null

  return (
    <Animated.View style={[styles.background, {opacity: scale}]}>
        <Animated.View style={[styles.container, {transform: [{translateX: -150}, {translateY: -200}, {scale: scale}]}]}>
            <Text style={styles.title}>Välkommen tillbaka</Text>
            <Text style={styles.text}>Här är din dagliga belöning, kom tillbaka imorgon för en ny belöning</Text>
            <MaterialIcons style={styles.icon} name="bolt" size={80} color="black" />
            <Text style={styles.coinsText}><Text style={styles.coins}>+100</Text> blixtar</Text>
            <TouchableOpacity style={styles.button} onPress={() => acceptReward()}>
                <Text style={styles.buttonText}>Ta emot</Text>
            </TouchableOpacity>
        </Animated.View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 100,
    },
    container: {
        position: 'absolute',
        top: "45%",
        left: "50%",
        width: 300,
        height: 450,
        backgroundColor: 'white',
        borderRadius: 10,
        zIndex: 100,
        borderColor: colors.border,
        borderWidth: 1,
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
    icon: {
        marginTop: 30,
        marginBottom: 10,
    },
    coinsText: {
        fontSize: 30,
        color: colors.text,
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
        marginTop: 60,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    }
})