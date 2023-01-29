import React, { useEffect, useRef, useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import { colors } from '../colors'
import { Animated } from 'react-native';

export default function TutorialsScreen() {

  const [selectedTab, setSelectedTab] = useState(0);
  const tabProgress = useRef(new Animated.Value(0)).current;

  const tutorials = [
    {
      title: "Enkel lampa",
      difficulty: "Lätt",
    },
    {
      title: "Lampa med dimmer",
      difficulty: "Lätt",
    },
    {
      title: "Lampa med färg",
      difficulty: "Lätt",
    },
    {
      title: "Lampa med färg och dimmer",
      difficulty: "Medelsvår",
    },
    {
      title: "Elmotor",
      difficulty: "Medelsvår",
    },
    {
      title: "Elmotor med dimmer",
      difficulty: "Medelsvår",
    },
  ]

  const difficulties = ["Lätt", "Medelsvår", "Svår"]

  useEffect(() => {
    Animated.timing(tabProgress, {
      toValue: (selectedTab / 3) * 300,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [selectedTab])

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Lektioner</Text>
      <View style={styles.tabs}>
        <Animated.View style={[styles.tabSelected, {left: tabProgress}]} />
        <TouchableWithoutFeedback onPress={() => setSelectedTab(0)}>
          <View style={styles.tab}>
            <Text style={styles.tabText}>Lätta</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => setSelectedTab(1)}>
          <View style={styles.tab}>
            <Text style={styles.tabText}>Mellan</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => setSelectedTab(2)}>
          <View style={styles.tab}>
            <Text style={styles.tabText}>Svåra</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {tutorials.filter(({difficulty}) => difficulty == difficulties[selectedTab]).map((tutorial, index) => {
          return (
            <TouchableOpacity key={index} style={styles.button}>
              <Text style={styles.buttonText}>{tutorial.title}</Text>
              <Text>{tutorial.difficulty}</Text>
            </TouchableOpacity>
          )
        })}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 25,
    paddingTop: 100,
  },
  headerText: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 25,
    marginBottom: 15,
    color: colors.header,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    marginBottom: 15,
    width: 310,
    height: 50,
    borderRadius: 20,
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 0.5,
    padding: 5,
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  tabSelected: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: "33.33%",
    height: "100%",
    margin: 5,
    borderRadius: 15,
    backgroundColor: colors.secondaryOpacity,
  },
  tabText: {
    color: colors.text,
    fontSize: 15,
    fontWeight: "600",
  },
  scrollView: {
    flex: 1,
    width: "100%",
    paddingTop: 15,
  },
  button: {
    backgroundColor: colors.card,
    width: "100%",
    height: 80,
    borderRadius: 15,
    borderColor: colors.border,
    borderWidth: 0.5,
    marginBottom: 15,
    justifyContent: 'center',
    paddingHorizontal: 25,
  },
  buttonText: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 5,
  },
})
