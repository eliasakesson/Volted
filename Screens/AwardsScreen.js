import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { colors } from '../colors'
import { FontAwesome5 } from '@expo/vector-icons';
import { ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AwardsScreen({ navigation }) {

    const [medals, setMedals] = useState({ gold: 0, silver: 0, bronze: 0 })

    useEffect(() => {
        getMedals()
    }, [navigation])

    const getMedals = async () => {
        try {
            const medalsGold = await AsyncStorage.getItem('medals-gold')
            const medalsSilver = await AsyncStorage.getItem('medals-silver')
            const medalsBronze = await AsyncStorage.getItem('medals-bronze')
            setMedals({ gold: medalsGold || 0, silver: medalsSilver || 0, bronze: medalsBronze || 0 })
        } catch (e) {
            console.log(e)
        }
    }


  return (
    <ScrollView style={styles.container}>
        <View style={styles.topColor}></View>
        <View style={styles.medals}>
            <View style={styles.medalColumn}>
                <FontAwesome5 name="medal" size={60} color="silver" />
                <View style={[styles.medalCount, {backgroundColor: "silver"}]}>
                    <Text style={styles.medalText}>{medals.silver}</Text>
                </View>
            </View>
            <View style={styles.medalColumn}>
                <FontAwesome5 name="medal" size={80} color="gold" />
                <View style={[styles.medalCount, {backgroundColor: "gold"}]}>
                    <Text style={styles.medalText}>{medals.gold}</Text>
                </View>
            </View>
            <View style={styles.medalColumn}>
                <FontAwesome5 name="medal" size={50} color="#cc6633" />
                <View style={[styles.medalCount, {backgroundColor: "#cc6633"}]}>
                    <Text style={styles.medalText}>{medals.bronze}</Text>
                </View>
            </View>
        </View>
        <View style={styles.wrapper}>
            <Text style={styles.header}>Senaste medaljer</Text>
        </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bg,
    },
    topColor: {
        backgroundColor: colors.text,
        height: 1000,
        width: "100%",
        position: "absolute",
        top: -1000,
        left: 0,
        zIndex: -1,
    },
    medals: {
        paddingHorizontal: 10,
        paddingTop: 100,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        backgroundColor: colors.text,
    },
    medalColumn: {
        flexDirection: 'column',
        alignItems: 'center',
        flex: 1,
    },
    medalCount: {
        marginTop: 25,
        paddingVertical: 20,
        paddingHorizontal: 25,
        backgroundColor: "gold",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    medalText: {
        color: colors.text,
        fontSize: 30,
        fontWeight: 'bold',
    },
    wrapper: {
        padding: 20,
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 25,
        color: colors.header,
    },
})