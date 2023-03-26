import React, { useEffect, useRef, useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import { colors } from '../colors'
import { Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { projects as orgProjects, ProjectCard, difficulties } from '../projects/projects';

export default function ProjectsScreen({ navigation }) {

  const [selectedTab, setSelectedTab] = useState(0);
  const tabProgress = useRef(new Animated.Value(0)).current;
  const [selectedFilter, setSelectedFilter] = useState(0);
  const [projects, setProjects] = useState(orgProjects || [])

  useEffect(() => {
    const projectsCopy = [...projects]

    const getProjectData = async () => {
      Promise.all(projects.map(async (project, index) => {
        const data = await AsyncStorage.getItem(project.id)
        projectsCopy[index] = {...project, ...JSON.parse(data)}
      })).then(() => {
        setProjects(projectsCopy)
      }).catch((e) => {
        console.log(e)
      })
    }

    getProjectData()
  }, [navigation])

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
        <Text style={styles.topText}>Uppgifter</Text>
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
        {projects?.filter(({difficulty, completed}) => (
          difficulty === selectedTab && (selectedFilter === 0 || (selectedFilter === 1 && !completed) || (selectedFilter === 2 && completed))
        ))?.map((project, index) => {
          return <ProjectCard key={index} project={project} navigation={navigation} />
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
    backgroundColor: colors.primary,
    height: 300,
    justifyContent: "flex-end",
    padding: 20,
  },
  topColor: {
    backgroundColor: colors.primary,
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
