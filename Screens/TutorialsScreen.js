import React, { useEffect, useRef, useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import { colors } from '../colors'
import { Animated } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TutorialScreen({ navigation }) {

  const [selectedTab, setSelectedTab] = useState(0);
  const tabProgress = useRef(new Animated.Value(0)).current;
  const [selectedFilter, setSelectedFilter] = useState(0);
  const [tutorials, setTutorials] = useState([])

  const difficulties = ["Lätt", "Medelsvår", "Svår"]

    
  useEffect(() => {
    const context = require.context('../tutorials', true, /\.json$/);
    const keys = context.keys();
    const values = keys.map(context);

    const getTutorialData = async () => {
      Promise.all(values.map(async (tutorial, index) => {
        const data = await AsyncStorage.getItem(tutorial.id)
        values[index] = {...tutorial, ...JSON.parse(data)}
      })).then(() => {
        setTutorials(values)
      }).catch((e) => {
        console.log(e)
      })
    }

    getTutorialData()
  }, [])

  useEffect(() => {
    Animated.timing(tabProgress, {
      toValue: (selectedTab / 3) * 300,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [selectedTab])

  const getTimeSince = (date) => {
    const seconds = Math.floor((new Date() - date) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) {
      return Math.floor(interval) + " år";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " månader";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " dagar";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " timmar";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minuter";
    }
    return Math.floor(seconds) + " sekunder";
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.topText}>Lektioner</Text>
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
      </View>
      <View style={styles.topColor}></View>
      <View style={styles.filterButtons}>
        <TouchableOpacity style={styles.filterButton} onPress={() => setSelectedFilter(0)}>
          <Text style={[styles.filterButtonText, {color: selectedFilter === 0 ? colors.primary : colors.textLight}]}>Alla</Text>
        </TouchableOpacity>
        <Text style={styles.divider}>|</Text>
        <TouchableOpacity style={styles.filterButton} onPress={() => setSelectedFilter(1)}>
          <Text style={[styles.filterButtonText, {color: selectedFilter === 1 ? colors.primary : colors.textLight}]}>Ej Avklarade</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton} onPress={() => setSelectedFilter(2)}>
          <Text style={[styles.filterButtonText, {color: selectedFilter === 2 ? colors.primary : colors.textLight}]}>Avklarade</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttons} showsVerticalScrollIndicator={false}>
        {tutorials?.filter(({difficulty, completed}) => (
          difficulty === difficulties[selectedTab] && (selectedFilter === 0 || (selectedFilter === 1 && !completed) || (selectedFilter === 2 && completed))
        ))?.map((tutorial, index) => {
          return (
            <TouchableOpacity onPress={() => navigation.navigate("Tutorial", {data: tutorial})} key={index} style={styles.button}>
              <View style={styles.innerButton}>
                <Text style={styles.buttonTitle}>{tutorial.title}</Text>
                <Text style={styles.buttonText}>{tutorial.description}</Text>
              </View>
              {tutorial?.date && (
                <View style={[styles.innerButton, {borderTopColor: colors.border, borderTopWidth: 0.5, flexDirection: "row"}]}>
                  <Text style={styles.buttonLightText}>Avklarad för {getTimeSince(new Date(tutorial.date))} sedan</Text>
                  <FontAwesome5 name="medal" size={18} color={{'Lätt': "#cc6633", 'Medelsvår': "silver", 'Svår': "gold"}[tutorial?.difficulty]} />
                </View> 
              )}
            </TouchableOpacity>
          )
        })}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  top: {
    backgroundColor: "#f07167",
    height: 300,
    justifyContent: "flex-end",
    padding: 20,
  },
  topColor: {
    backgroundColor: "#f07167",
    height: 1000,
    width: "100%",
    position: "absolute",
    top: -1000,
    left: 0,
    zIndex: -1,
  },
  topText: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    marginLeft: 20,
    marginBottom: 30,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    marginBottom: 15,
    width: 310,
    height: 50,
    borderRadius: 10,
    backgroundColor: colors.text,
    borderWidth: 0.5,
    borderColor: colors.textLight,
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
    borderRadius: 8,
    backgroundColor: "#555",
  },
  tabText: {
    color: "white",
    fontSize: 15,
    fontWeight: "600",
  },
  buttons: {
    flex: 1,
    padding: 25,
  },
  button: {
    backgroundColor: colors.card,
    borderRadius: 10,
    borderColor: colors.border,
    borderWidth: 0.5,
    marginBottom: 20,
  },
  innerButton: {
    paddingHorizontal: 25,
    paddingVertical: 15,
    justifyContent: "space-between",
  },
  buttonTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  buttonText: {
    color: colors.text,
    fontSize: 14,
  },
  buttonLightText: {
    color: colors.textLight,
    fontSize: 14,
  },
  filterButtons: {
    flexDirection: "row",
    paddingHorizontal: 30,
    paddingTop: 25,
  },
  filterButton: {
    marginRight: 25,
    paddingVertical: 10,
  },
  filterButtonText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: "600",
  },
  divider: {
    color: colors.text,
    fontSize: 14,
    fontWeight: "600",
    marginRight: 25,
    paddingVertical: 10,
  },
})
