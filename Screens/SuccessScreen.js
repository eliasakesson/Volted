import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { colors } from '../colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SuccessScreen({ route, navigation }) {

  const { data } = route?.params;

  const backToHome = () => {
    if (data && data.difficulty){
      const medalItems = {'Lätt': "medals-bronze", 'Medelsvår': "medals-silver", 'Svår': "medals-gold"}
      
      addMedal(medalItems[data.difficulty])
    }

    navigation.replace("HomeTab")
  }

  const addMedal = async (medal) => {
    try {
      const medals = await AsyncStorage.getItem(medal)
      console.log(medals)
      await AsyncStorage.setItem(medal, (Number(medals) + 1).toString())
      console.log(Number(medals) + 1)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <View style={styles.container}>
      <FontAwesome5 name="medal" size={80} color={{'Lätt': "#cc6633", 'Medelsvår': "silver", 'Svår': "gold"}[data?.difficulty]} />
      <Text style={styles.header}>Grattis!</Text>
      <Text style={styles.text}>Du klarade lektionen {data.title}</Text>
      <TouchableOpacity onPress={backToHome} style={styles.button}>
        <Text style={styles.buttonText}>Gå tillbaka till lektioner</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 50,
    paddingHorizontal: 25,
  },
  header: {
    fontSize: 40,
    fontWeight: 'bold',
    marginVertical: 25,
  },
  text: {
    fontSize: 20,
  },
  button: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 10,
    marginVertical: 25,
    width: "100%",
    marginTop: "auto",
    alignItems: 'center',
  },
  buttonText: {
    color: "white",
    fontSize: 15,
  },
})