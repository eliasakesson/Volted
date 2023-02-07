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
        <View style={styles.medals}>
            <View style={styles.medalColumn}>
                <FontAwesome5 name="medal" size={60} color="silver" />
                <Text style={styles.medalText}>{medals.silver}</Text>
            </View>
            <View style={styles.medalColumn}>
                <FontAwesome5 name="medal" size={80} color="gold" />
                <Text style={styles.medalText}>{medals.gold}</Text>
            </View>
            <View style={styles.medalColumn}>
                <FontAwesome5 name="medal" size={50} color="#cc6633" />
                <Text style={styles.medalText}>{medals.bronze}</Text>
            </View>
        </View>
        <View>
            <Text style={styles.header}>Senaste medaljer</Text>
        </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bg,
        padding: 25,
        paddingTop: 100,
    },
    medals: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginBottom: 25,
    },
    medalColumn: {
        flexDirection: 'column',
        alignItems: 'center',
        flex: 1,
    },
    medalText: {
        color: colors.header,
        fontSize: 25,
        fontWeight: 'bold',
        marginVertical: 25,
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 25,
        color: colors.header,
    },
})