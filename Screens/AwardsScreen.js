import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { colors } from '../colors'
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function AwardsScreen() {
  return (
    <View style={styles.container}>
        <View style={styles.medals}>
            <View style={[styles.medalColumn, {marginTop: 25}]}>
                <MaterialCommunityIcons name="medal" size={50} color="silver" />
                <Text style={styles.medalText}>15</Text>
            </View>
            <View style={styles.medalColumn}>
                <MaterialCommunityIcons name="medal" size={60} color="gold" />
                <Text style={styles.medalText}>5</Text>
            </View>
            <View style={[styles.medalColumn, {marginTop: 50}]}>
                <MaterialCommunityIcons name="medal" size={50} color="bronze" />
                <Text style={styles.medalText}>32</Text>
            </View>
        </View>
        <View>
            <Text>Senaste medaljer</Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bg,
        alignItems: 'center',
        justifyContent: 'center',
    },
    medals: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    medalColumn: {
        flexDirection: 'column',
        alignItems: 'center',
    },
})