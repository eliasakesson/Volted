import React, { useEffect, useRef, useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import { colors } from '../colors'
import { Animated } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { tutorials, TutorialCard, difficulties } from '../tutorials/tutorials';

export default function TutorialScreen({ navigation }) {

  const [selectedTab, setSelectedTab] = useState(0);
  const tabProgress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(tabProgress, {
      toValue: (selectedTab / 3) * 300,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [selectedTab])

  return (
    <ScrollView style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.topText}>Lektioner</Text>
        <View style={styles.tabs}>
          <Animated.View style={[styles.tabSelected, {left: tabProgress}]} />
          <TouchableWithoutFeedback onPress={() => setSelectedTab(0)}>
            <View style={styles.tab}>
              <Text style={styles.tabText}>{difficulties[0]}</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => setSelectedTab(1)}>
            <View style={styles.tab}>
              <Text style={styles.tabText}>{difficulties[1]}</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => setSelectedTab(2)}>
            <View style={styles.tab}>
              <Text style={styles.tabText}>{difficulties[2]}</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
      <View style={styles.topColor}></View>
      <View style={styles.tutorials} showsVerticalScrollIndicator={false}>
        {tutorials?.map((tutorial, index) => {
          if (tutorial.difficulty !== selectedTab) return null;

          return <TutorialCard key={index} tutorial={tutorial} navigation={navigation} />
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
    backgroundColor: "hsl(227, 24%, 69%)",
    height: 300,
    justifyContent: "flex-end",
    padding: 20,
  },
  topColor: {
    backgroundColor: "hsl(227, 24%, 69%)",
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
  tutorials: {
    flex: 1,
    padding: 20,
  },
})
