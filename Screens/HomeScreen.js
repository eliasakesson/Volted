import React, { useEffect } from 'react';
import { Button, Dimensions, StyleSheet, Text, TouchableOpacity, View, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { AntDesign, Feather } from '@expo/vector-icons';
import { colors } from '../colors';

export default function HomeScreen({ navigation }) {

    return (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
            <View style={styles.between}>
                <TouchableOpacity style={[styles.avatar, {backgroundColor: "none"}]}>
                    <AntDesign name="bars" size={30} color={colors.header} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Profile")} style={styles.avatar}>
                    <AntDesign name="user" size={30} color="white" />
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate("Sandbox")} style={styles.headerButton}>
                <View>
                    <Text style={styles.headerButtonHeader}>Sandlådsläge</Text>
                    <Text style={styles.headerButtonText}>Använd din kreativitet och bygg vad du vill!</Text>
                </View>
                <AntDesign name="flag" size={50} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.header}>Populära Genomgångar</Text>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.popular}>
                <TouchableOpacity style={styles.popularItem}>
                    <View>
                        <Text style={styles.popularItemHeader}>Enkel Lampa</Text>
                        <Text style={styles.popularItemText}>Lär dig om kretsar och hur de fungerar</Text>
                    </View>
                    <View style={styles.likes}>
                        <Text style={styles.likeText}>25</Text>
                        <Feather name="thumbs-up" size={20} color={colors.header} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.popularItem}>
                    <View>
                        <Text style={styles.popularItemHeader}>Elmotor</Text>
                        <Text style={styles.popularItemText}>Lär dig om kretsar och hur de fungerar</Text>
                    </View>
                    <View style={styles.likes}>
                        <Text style={styles.likeText}>8</Text>
                        <Feather name="thumbs-up" size={20} color={colors.header} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.popularItem}>
                    <View>
                        <Text style={styles.popularItemHeader}>Jetmotor</Text>
                        <Text style={styles.popularItemText}>Lär dig om kretsar och hur de fungerar</Text>
                    </View>
                    <View style={styles.likes}>
                        <Text style={styles.likeText}>15</Text>
                        <Feather name="thumbs-up" size={20} color={colors.header} />
                    </View>
                </TouchableOpacity>
            </ScrollView>
            <Text style={styles.header}>Senaste</Text>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Projekt 3</Text>
                <Text>1 timme sedan</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Projekt 2</Text>
                <Text>7 timmar sedan</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Projekt 1</Text>
                <Text>3 dagar sedan</Text>
            </TouchableOpacity>
            <Button onPress={() => navigation.replace("Splash")} title="Show splashscreen (Temporary)"></Button>
        </ScrollView>
    )

    return (
        <ScrollView style={oldStyles.container}>
            <Text style={oldStyles.welcomeText}>Välkommen tillbaka <Text style={{fontWeight: 'bold'}}>Elias</Text></Text>
            <View style={oldStyles.largeButtons}>
                <TouchableWithoutFeedback onPress={() => navigation.navigate("Sandbox")} style={oldStyles.largeButton}>
                    <AntDesign name="flag" size={50} color={colors.primary} />
                    <Text style={oldStyles.largeButtonText}>Sandlådsläge</Text>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback style={oldStyles.largeButton}>
                    <AntDesign name="search1" size={50} color={colors.primary} />
                    <Text style={oldStyles.largeButtonText}>Utforska</Text>
                </TouchableWithoutFeedback>
            </View>
            <Text style={oldStyles.headerText}>Senaste</Text>
            <TouchableWithoutFeedback style={oldStyles.button}>
                <Text style={oldStyles.buttonText}>Projekt 1</Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback style={oldStyles.button}>
                <Text style={oldStyles.buttonText}>Projekt 2</Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback style={oldStyles.button}>
                <Text style={oldStyles.buttonText}>Projekt 3</Text>
            </TouchableWithoutFeedback>
            <Button onPress={() => navigation.replace("Splash")} title="Show splashscreen (Temporary)"></Button>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 70,
        paddingBottom: 20,
        paddingHorizontal: 20,
        backgroundColor: colors.bg,
    },
    between: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    row: {
        flexDirection: 'row',
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: colors.secondary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerButton: {
        backgroundColor: colors.primary,
        width: Dimensions.get('window').width - 40,
        height: (Dimensions.get('window').width - 40) * 0.55,
        borderRadius: 25,
        marginTop: 25,
        paddingHorizontal: 25,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        shadowColor: "#000",
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 0.25,
    },
    headerButtonHeader: {
        fontSize: 30,
        fontWeight: 'bold',
        color: "#fff",
    },
    headerButtonText: {
        color: "#fff",
        fontSize: 18,
        maxWidth: Dimensions.get('window').width * 0.5,
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 25,
        color: colors.header,
    },
    popular: {
        flexDirection: 'row',
        width: Dimensions.get('window').width,
        transform: [{translateX: -20}],
        paddingLeft: 10,
    },
    popularItem: {
        backgroundColor: colors.secondaryOpacity,
        width: 180,
        height: 160,

        borderRadius: 15,
        marginHorizontal: 10,
        padding: 25,
        justifyContent: 'space-between',
    },
    popularItemHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.header,
        marginBottom: 5,
    },
    popularItemText: {
        color: colors.text,
        fontSize: 12,
    },
    likes: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-end',
    },
    likeText: {
        color: colors.header,
        fontSize: 16,
        fontWeight: '500',
        marginRight: 5,
    },
    button: {
        backgroundColor: colors.card,
        width: "100%",
        height: 80,
        borderRadius: 15,
        borderColor: colors.border,
        borderWidth: 0.5,
        marginBottom: 15,
        justifyContent: 'center',
        paddingHorizontal: 25,
    },
    buttonText: {
        color: colors.text,
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 5,
    },
});

const oldStyles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 100,
        paddingHorizontal: 25,
        backgroundColor: colors.bg,
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
        color: colors.text,
    },
    headerText: {
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: 25,
        marginBottom: 15,
        color: colors.header,
    },
    largeButtons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: Dimensions.get('window').width * 0.6,
    },
    largeButton: {
        backgroundColor: colors.card,
        flex: 1,
        width: Dimensions.get('window').width * 0.4,
        height: "100%",
        borderRadius: 10,
        marginHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: colors.border,
        borderWidth: 1,
    },
    largeButtonText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 25,
        color: colors.text,
    },
    button: {
        backgroundColor: colors.card,
        width: "100%",
        height: 60,
        borderRadius: 10,
        justifyContent: 'center',
        paddingHorizontal: 25,
        marginBottom: 10,
        borderColor: colors.border,
        borderWidth: 1,
    },
    buttonText: {
        fontSize: 20,
        fontWeight: '500',
        color: colors.text
    },
});
  