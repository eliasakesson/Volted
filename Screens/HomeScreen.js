import React, { useEffect } from 'react';
import { Button, Dimensions, StyleSheet, Text, View } from 'react-native';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.welcomeText}>Välkommen tillbaka <Text style={{fontWeight: 'bold'}}>Elias</Text></Text>
            <View style={styles.largeButtons}>
                <TouchableWithoutFeedback onPress={() => navigation.navigate("Sandbox")} style={styles.largeButton}>
                    <AntDesign name="flag" size={50} color="#6495ED" />
                    <Text style={styles.largeButtonText}>Sandlådsläge</Text>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback style={styles.largeButton}>
                    <AntDesign name="search1" size={50} color="#6495ED" />
                    <Text style={styles.largeButtonText}>Utforska</Text>
                </TouchableWithoutFeedback>
            </View>
            <Text style={styles.headerText}>Senaste</Text>
            <TouchableWithoutFeedback style={styles.button}>
                <Text style={styles.buttonText}>Projekt 1</Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback style={styles.button}>
                <Text style={styles.buttonText}>Projekt 2</Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback style={styles.button}>
                <Text style={styles.buttonText}>Projekt 3</Text>
            </TouchableWithoutFeedback>
            <Button onPress={() => navigation.replace("Splash")} title="Show splashscreen (Temporary)"></Button>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 100,
        paddingHorizontal: 25,
    
    },
    background: {
        position: 'absolute',
        top: 100,
        left: -25,
        width: Dimensions.get('window').width,
        height: 2000,
        borderRadius: 15,
    },
    welcomeText: {
        fontSize: 25,
        marginBottom: 25,
        color: '#fff',
    },
    headerText: {
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: 25,
        marginBottom: 15,
        color: '#fff',
    },
    largeButtons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: Dimensions.get('window').width * 0.6,
    },
    largeButton: {
        backgroundColor: '#3e4553',
        flex: 1,
        width: Dimensions.get('window').width * 0.4,
        height: "100%",
        borderRadius: 10,
        marginHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    largeButtonText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 25,
        color: '#fff',
    },
    button: {
        backgroundColor: '#3e4553',
        width: "100%",
        height: 60,
        borderRadius: 10,
        justifyContent: 'center',
        paddingHorizontal: 25,
        marginBottom: 10,
    },
    buttonText: {
        fontSize: 20,
        fontWeight: '500',
        color: 'white'
    },
});
  