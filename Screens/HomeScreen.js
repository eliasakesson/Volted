import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View, ScrollView, Button } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { colors } from '../colors';
import { tutorialCard, tutorials } from '../tutorials/tutorials';
import { projectCard, projects } from '../projects/projects';

export default function HomeScreen({ navigation }) {

    return (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate("Sandbox")} style={styles.headerButton}>
                <View>
                    <Text style={styles.headerButtonHeader}>Sandlådsläge</Text>
                    <Text style={styles.headerButtonText}>Använd din kreativitet och bygg vad du vill!</Text>
                </View>
                <AntDesign name="flag" size={50} color="#fff" />
            </TouchableOpacity>
            <View style={styles.row}>
                <Text style={styles.header}>Populära projekt</Text>
                <Button title='Visa alla' onPress={() => navigation.navigate("Projects")}></Button>
            </View>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.projects} snapToInterval={Dimensions.get('window').width - 80} contentContainerStyle={{paddingRight: 20}}>
                {projects?.map((project, index) => {
                    if (!project.popular) return null

                    return (
                        <View style={styles.project} key={index}>
                            {projectCard(project, navigation)}
                        </View>
                    )
                })}
            </ScrollView>
            <View style={styles.row}>
                <Text style={[styles.header, {marginTop: 10}]}>Populära lektioner</Text>
                <Button title='Visa alla' onPress={() => navigation.navigate("Tutorials")}></Button>
            </View>
            {tutorials?.map((tutorial, index) => {
                if (!tutorial.popular) return null

                return tutorialCard(tutorial, navigation)
            })}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 100,
        paddingBottom: 20,
        paddingHorizontal: 20,
        backgroundColor: colors.bg,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerButton: {
        backgroundColor: colors.primary,
        width: Dimensions.get('window').width - 40,
        height: (Dimensions.get('window').width - 40) * 0.55,
        borderRadius: 25,
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
        marginBottom: 25,
        marginTop: 40,
        color: colors.header,
    },
    projects: {
        flexDirection: 'row',
        width: Dimensions.get('window').width,
        transform: [{translateX: -20}],
        paddingLeft: 20,
    },
    project: {
        marginRight: 20,
        width: Dimensions.get('window').width - 100,
    },
});