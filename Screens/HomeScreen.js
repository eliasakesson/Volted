import React, { useEffect } from 'react';
import { Button, Dimensions, StyleSheet, Text, View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.welcomeText}>Welcome Back <Text style={styles.welcomeTextBold}>Elias</Text></Text>
            <View style={styles.largeButtons}>
                <TouchableOpacity onPress={() => navigation.navigate("Sandbox")} style={styles.largeButton}>
                    <AntDesign name="flag" size={50} color="black" />
                    <Text style={styles.largeButtonText}>Sandbox</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.largeButton}>
                    <AntDesign name="book" size={50} color="black" />
                    <Text style={styles.largeButtonText}>Other</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.headerText}>Latest</Text>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Project 1</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Project 2</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Project 3</Text>
            </TouchableOpacity>
            <Button onPress={() => navigation.replace("Splash")} title="Go to splash"></Button>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingVertical: 50,
        paddingHorizontal: 25,
    },
    welcomeText: {
        fontSize: 25,
        marginBottom: 25,
    },
    welcomeTextBold: {
        fontWeight: 'bold',
    },
    headerText: {
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: 25,
        marginBottom: 15,
    },
    largeButtons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: Dimensions.get('window').width * 0.6,
    },
    largeButton: {
        backgroundColor: '#fff',
        flex: 1,
        width: Dimensions.get('window').width * 0.4,
        height: "100%",
        borderRadius: 10,
        marginHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.15,
        shadowRadius: 3.84,
    },
    largeButtonText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 25,
    },
    button: {
        backgroundColor: '#fff',
        width: "100%",
        height: 60,
        borderRadius: 10,
        justifyContent: 'center',
        paddingHorizontal: 25,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.15,
        shadowRadius: 3.84,
    },
    buttonText: {
        fontSize: 20,
        fontWeight: '500',
        color: '#333'
    },
});
  