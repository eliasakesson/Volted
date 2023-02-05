import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { colors } from '../colors'
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';

export default function AwardsScreen() {
  return (
    <View style={styles.container}>
        <View style={styles.medals}>
            <View style={styles.medalColumn}>
                <FontAwesome5 name="medal" size={60} color="silver" />
                <Text style={styles.medalText}>15</Text>
            </View>
            <View style={styles.medalColumn}>
                <FontAwesome5 name="medal" size={80} color="gold" />
                <Text style={styles.medalText}>5</Text>
            </View>
            <View style={styles.medalColumn}>
                <FontAwesome5 name="medal" size={50} color="#cc6633" />
                <Text style={styles.medalText}>32</Text>
            </View>
        </View>
        <View>
            <Text style={styles.header}>Senaste medaljer</Text>
        </View>
    </View>
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
        flexDirection: 'column-reverse',
        alignItems: 'center',
        flex: 1,
    },
    medalText: {
        color: colors.header,
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 25,
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 25,
        color: colors.header,
    },
})