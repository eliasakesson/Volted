import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { colors } from '../colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SuccessScreen({ route, navigation }) {

  const { data } = route?.params;

  const complete = () => {
    if (data){
      // Get tutorial data
      if (getTutorialData(data.id)){
        navigation.replace("HomeTab")
        return
      }

      console.log(data.difficulty)
      // Add medal
      addMedal(data.difficulty)

      // Add as completed
      addTutorialData(data.id)

      // Add to list of completed tutorials
      addToCompletedTutorials(data.id)
    }

    navigation.replace("HomeTab")
  }

  const getTutorialData = async (id) => {
    try {
      const data = await AsyncStorage.getItem(id)
      return data ? true : false
    } catch (e) {
      console.log(e)
    }
  }

  const addMedal = async (difficulty) => {

    const medalItems = ["medals-bronze", "medals-silver", "medals-gold"]
    const medal = medalItems[difficulty]

    try {
      const medals = await AsyncStorage.getItem(medal)
      console.log(medals)
      await AsyncStorage.setItem(medal, (Number(medals) + 1).toString())
      console.log(Number(medals) + 1)
    } catch (e) {
      console.log(e)
    }
  }

  const addTutorialData = async (id) => {
    const json = {
      completed: true,
      date: new Date(),
    }

    try {
      await AsyncStorage.setItem(id, JSON.stringify(json))
      console.log("Added tutorial data")
    } catch (e) {
      console.log(e)
    }
  }

  const addToCompletedTutorials = async (data) => {
    try {
      const completedTutorials = await AsyncStorage.getItem("completed-tutorials")
      if (completedTutorials){
        const completedTutorialsArray = JSON.parse(completedTutorials)
        completedTutorialsArray.push({title: data.title, id: data.id, difficulty: data.difficulty})
        await AsyncStorage.setItem("completed-tutorials", JSON.stringify(completedTutorialsArray))
      } else {
        await AsyncStorage.setItem("completed-tutorials", JSON.stringify([{title: data.title, id: data.id, difficulty: data.difficulty}]))
      }
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <View style={styles.container}>
      <FontAwesome5 name="medal" size={80} color={["#cc6633", "silver", "gold"][data.difficulty]} />
      <Text style={styles.header}>Grattis!</Text>
      <Text style={styles.text}>Du klarade lektionen {data.title}</Text>
      <TouchableOpacity onPress={complete} style={styles.button}>
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