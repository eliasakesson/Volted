import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native'
import { Stringify } from '../Helpers'
import { colors } from '../colors'
import { AntDesign } from '@expo/vector-icons';

export default function TutorialScreen({ route, navigation }) {

    const { data } = route.params;
    const [currentStep, setCurrentStep] = useState(0)

    const notLastStep = currentStep < data.tutorial.length - 1

    const nextStep = () => {
        if (notLastStep) {
            setCurrentStep(currentStep + 1)
        } else {
            navigation.navigate("Sandbox", { data })
        }
    }

    useEffect(() => {
        navigation.setOptions({ title: data.title })
    }, [])

  return (
    <View style={styles.container}>
        <View style={styles.top}>
            {data.tutorial[currentStep].image && <Image style={styles.image} source={{uri: data.tutorial[currentStep].image}} />}
        </View>
        <View style={styles.bottom}>
            <Text style={styles.title}>{Stringify(data.tutorial[currentStep].title)}</Text>
            <Text style={styles.description}>{Stringify(data.tutorial[currentStep].text)}</Text>
            <View style={styles.buttons}>   
                {currentStep > 0 &&   
                    <TouchableOpacity style={[styles.button, styles.squareButton]} onPress={() => setCurrentStep(currentStep - 1)}>
                        <AntDesign name="caretleft" size={18} color="white" />
                    </TouchableOpacity>        
                }
                {notLastStep ? 
                    <TouchableOpacity style={styles.button} onPress={() => setCurrentStep(currentStep + 1)}>
                        <Text style={styles.buttonText}>Nästa</Text>
                    </TouchableOpacity> :
                    <TouchableOpacity style={[styles.button, {backgroundColor: colors.primary}]} onPress={() => navigation.navigate("Sandbox", { data })}>
                        <Text style={styles.buttonText}>Starta</Text>
                    </TouchableOpacity>
                }
            </View>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bg,
        padding: 50,
    },
    top: {
        flex: 1,
        alignItems: 'center',
    },
    image: {
        width: "100%",
        aspectRatio: 1,
        resizeMode: 'cover',
    },
    bottom: {
        flex: 1,
        marginTop: 25,
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
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: "auto",
    },
    button: {
        backgroundColor: colors.text,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: "auto",
        flex: 1,
    },
    squareButton: {
        marginRight: 25,
        flex: 0,
        padding: 17,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: "white",
        fontSize: 18,
    },
})