import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { AntDesign, Feather } from '@expo/vector-icons';
import { colors } from '../colors';
import { Button } from 'react-native';

export default function HomeScreen({ navigation }) {

    const [projects, setProjects] = useState([])
    
    useEffect(() => {
        const context = require.context('../projects', true, /\.json$/);
        const keys = context.keys();
        const values = keys.map(context);
        setProjects(values)
    }, [])

    return (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate("Sandbox")} style={styles.headerButton}>
                <View>
                    <Text style={styles.headerButtonHeader}>Sandlådsläge</Text>
                    <Text style={styles.headerButtonText}>Använd din kreativitet och bygg vad du vill!</Text>
                </View>
                <AntDesign name="flag" size={50} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.header}>Populära Projekt</Text>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.popular}>
                {projects?.map((project, index) => {
                    if (!project.popular) return null

                    return (
                        <TouchableOpacity key={index} style={styles.popularItem} onPress={() => navigation.navigate("Sandbox", { data: project })}>
                            <View>
                                <Text style={styles.popularItemHeader}>{project.title}</Text>
                                <Text style={styles.popularItemText}>{project.description}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                })}
            </ScrollView>
            <Text style={styles.header}>Senaste</Text>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonTitle}>Projekt 3</Text>
                <Text style={styles.buttonText}>1 timme sedan</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonTitle}>Projekt 2</Text>
                <Text style={styles.buttonText}>7 timmar sedan</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonTitle}>Projekt 1</Text>
                <Text style={styles.buttonText}>3 dagar sedan</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 70,
        paddingBottom: 20,
        paddingHorizontal: 20,
        backgroundColor: colors.bg,
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
        marginTop: 50,
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
        height: 140,

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
        borderRadius: 10,
        borderColor: colors.border,
        borderWidth: 0.5,
        marginBottom: 15,
        justifyContent: 'center',
        paddingHorizontal: 25,
        paddingVertical: 20,
    },
    buttonTitle: {
        color: colors.text,
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },
    buttonText: {
        color: colors.textLight,
        fontSize: 14,
    }
});