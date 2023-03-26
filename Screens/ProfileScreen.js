import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import { colors } from '../colors'
import { FontAwesome5 } from '@expo/vector-icons';
import { ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';

export default function ProfileScreen({ navigation }) {

  return (
    <ScrollView style={styles.container}>
        <View style={styles.topColor}></View>
        <View style={styles.profile}>
            <View style={styles.profileCard}>
                <View style={styles.profileWrapper}>
                    <View style={styles.profileImageWrapper}>
                        <Text style={styles.profileImageText}>E</Text>
                    </View>
                    <View>
                        <Text style={styles.profileName}>Elias</Text>
                        <Text style={styles.profileText}>Elev</Text>
                    </View>
                </View>
                <View style={styles.profileWrapper}>
                    <Money />
                </View>
            </View>
        </View>
        <Medals navigation={navigation} />
        <View style={styles.wrapper}>
            <Text style={styles.header}>Vänner</Text>
            <Friends />
        </View>
    </ScrollView>
  )
}

const Money = () => {

    const [money, setMoney] = useState(0)

    useEffect(() => {
        getMoney()
    }, [])

    const getMoney = async () => {
        try {
            const money = await AsyncStorage.getItem('money')
            setMoney(money || 0)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <>
            <Text style={styles.profileBoltText}>{money}</Text>
            <MaterialIcons name="bolt" size={30} color="black" />
        </>
    )
}

const Medals = ({ navigation }) => {

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
    )
}

const Friends = () => {
    return (
        <View style={styles.friends}>
            <View style={styles.friend}>
                <View>
                    <Text style={styles.friendName}>Hilma</Text>
                    <Text style={styles.friendText}>Online 16 minuter sedan</Text>
                </View>
                <View style={styles.friendMedals}>
                    <View style={styles.friendMedal}>
                        <FontAwesome5 name="medal" size={20} color="gold" />
                        <Text style={styles.friendMedalText}>2</Text>
                    </View>
                    <View style={styles.friendMedal}>
                        <FontAwesome5 name="medal" size={20} color="silver" />
                        <Text style={styles.friendMedalText}>4</Text>
                    </View>
                    <View style={styles.friendMedal}>
                        <FontAwesome5 name="medal" size={20} color="#cc6633" />
                        <Text style={styles.friendMedalText}>7</Text>
                    </View>
                </View>
            </View>
            <View style={styles.friend}>
                <View>
                    <Text style={styles.friendName}>Cornelia</Text>
                    <Text style={styles.friendText}>Online 2 timmar sedan</Text>
                </View>
                <View style={styles.friendMedals}>
                    <View style={styles.friendMedal}>
                        <FontAwesome5 name="medal" size={20} color="gold" />
                        <Text style={styles.friendMedalText}>1</Text>
                    </View>
                    <View style={styles.friendMedal}>
                        <FontAwesome5 name="medal" size={20} color="silver" />
                        <Text style={styles.friendMedalText}>5</Text>
                    </View>
                    <View style={styles.friendMedal}>
                        <FontAwesome5 name="medal" size={20} color="#cc6633" />
                        <Text style={styles.friendMedalText}>8</Text>
                    </View>
                </View>
            </View>
        </View>
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
    profile: {
        backgroundColor: colors.text,
        paddingTop: 80,
        paddingBottom: 30,
        paddingHorizontal: 15,
    },
    profileCard: {
        backgroundColor: colors.bg,
        padding: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.text,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    profileWrapper: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    profileImageWrapper: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: colors.primaryOpacity,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 15,
    },
    profileImageText: {
        color: colors.primary,
        fontSize: 24,
        fontWeight: '600',
    },
    profileName: {
        color: colors.text,
        fontSize: 24,
        fontWeight: '600',
    },
    profileBoltText: {
        color: colors.text,
        fontSize: 24,
        fontWeight: '600',
    },
    medals: {
        paddingHorizontal: 10,
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
    friends: {
        flexDirection: 'column',
    },
    friend: {
        flex: 1,
        backgroundColor: colors.card,
        borderColor: colors.border,
        borderWidth: 1,
        padding: 20,
        margin: 5,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    friendName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.text,
    },
    friendText: {
        color: colors.text,
        fontSize: 11,
        marginTop: 5,
    },
    friendMedals: {
        flexDirection: 'row',
    },
    friendMedal: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
    },
    friendMedalText: {
        color: colors.text,
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 5,
    },
})