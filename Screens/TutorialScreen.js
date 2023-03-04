import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import { colors } from '../colors'
import { AntDesign } from '@expo/vector-icons';
import TEnkelLampa from '../tutorials/TLektion1';

export default function TutorialScreen({ route, navigation }) {

    const { data } = route.params;
    const [currentStep, setCurrentStep] = useState(0)

    const notLastStep = currentStep < data.tutorial.length - 1

    useEffect(() => {
        navigation.setOptions({ title: data.title })

        setCurrentStep(0)
    }, [navigation])

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <TEnkelLampa styles={styles} ChoiceComponent={ChoiceComponent} />
    </ScrollView>
  )
}

function ChoiceComponent({ choices , rightAnswer }){

    const [guessedAnswer, setGuessedAnswer] = useState("")

    return (
        <View style={styles.choiceComponent}>
            {choices?.map((choice, index) => {
                return (
                    <TouchableOpacity style={[styles.choice, !guessedAnswer ? {} : choice === rightAnswer ? {borderColor: "#398754"} : {borderColor: "#cc0000"}]}
                                    key={index} onPress={() => setGuessedAnswer(choice)}>
                        <Text style={styles.choiceText}>{choice}</Text>
                    </TouchableOpacity>
                )
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bg,
        padding: 25,
    },
    contentContainer: {
        paddingTop: 30,
        paddingBottom: 80,

    },
    title1: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 20,
        color: colors.header,
    },
    lektion: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        color: colors.primary,
    },
    title2: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 20,
        color: colors.header,
    },
    title3: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 20,
        color: colors.header,
    },
    text: {
        fontSize: 16,
        marginBottom: 20,
        color: colors.text,
    },
    choiceComponent: {
        flexDirection: 'column',
        marginBottom: 50,
    },
    choice: {
        backgroundColor: colors.card,
        padding: 20,
        borderColor: colors.border,
        borderWidth: 1.5,
        borderRadius: 10,
        marginBottom: 10,
    },
    choiceText: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.text,
    },
    image: {
        width: "100%",
        height: 200,
        resizeMode: 'cover',
        borderRadius: 10,
        marginBottom: 50,
    },
    button: {
        backgroundColor: colors.primary,
        padding: 20,
        borderRadius: 10,
        marginTop: 20,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    },
})