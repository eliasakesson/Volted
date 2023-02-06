import React from 'react'
import { View, Text } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { colors } from '../colors';

export default function SuccessScreen({ route, navigation }) {

  const { data } = route?.params;

  return (
    <View style={styles.container}>
      <FontAwesome5 name="medal" size={80} color="gold" />
      <Text style={styles.header}>Grattis!</Text>
      <Text style={styles.text}>Du klarade lektionen {data.title}</Text>
      <TouchableOpacity onPress={() => navigation.replace("HomeTab")} style={styles.button}>
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