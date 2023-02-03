import React, { useEffect, useState, useRef, useMemo } from 'react';
import { Button, Dimensions, Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CreateComponent from '../components/CreateComponent';
import DragComponent from '../components/DragComponent';
import Battery from '../components/electronics/Battery';
import Resistor from '../components/electronics/Resistor';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import SideMenu from '@chakrahq/react-native-side-menu';
import { colors } from '../colors';
import { useWindowDimensions } from 'react-native';
import Wire from '../components/electronics/Wire';
import BottomSheet from '@gorhom/bottom-sheet';
import { Stringify } from '../Helpers';

export default function SandboxScreen({ route, navigation }) {

  const { data } = route?.params || {};

  const [isDragging, setIsDragging] = useState(false)
  const [components, setComponents] = useState([])
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const [tooltipOpen, setTooltipOpen] = useState(true)

  const [currentStep, setCurrentStep] = useState(0)

  const snapPoints = useMemo(() => ['11%', '50%'], []);

  const { width, height } = useWindowDimensions();

  const onDragEnd = (position, index) => {
    setIsDragging(false)
    // If component is dropped inside trashcan, remove it from the components array
    if (position.x > width - 200 && position.y > height - 200){
      setComponents((prev) => {
        const newComponents = [...prev]
        newComponents.splice(index, 1)
        return newComponents
      })
    }
  }

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => setSidebarOpen(true)}>
          <AntDesign name="plus" size={30} color={colors.header} style={{marginRight: 10}} />
        </TouchableOpacity>
      ),
    });
  }, [navigation])

  useEffect(() => {
    if (sidebarOpen && tooltipOpen) setTooltipOpen(false)
  }, [sidebarOpen])

  const libraryComponents = [
    {component: <Battery />, type: ""},
    {component: <Resistor strength={"SVAG"} />, type: ""},
    {component: <Resistor strength={"MEDEL"} />, type: ""},
    {component: <Resistor strength={"SVÅR"} />, type: ""},
    {component: <Wire />, libraryComponent: <Wire disabled />, type: "non-drag"},
  ]

  const menu = (
    <View style={styles.menu}>
      <Text style={styles.menuHeader}>Komponenter</Text>
      <View style={styles.library}>
        {libraryComponents.map((component, index) => {
          return (
            <CreateComponent key={index} component={component.component} libraryComponent={component.libraryComponent} type={component.type} setComponents={setComponents} />
          )
        })}
      </View>
    </View>
  )

  return (
    <>
      <SideMenu menu={menu} isOpen={sidebarOpen} onChange={(open) => setSidebarOpen(open)} menuPosition="right">
        <View style={styles.container}>
          <ImageBackground resizeMode='repeat' source={require('../assets/dots.png')} style={[styles.backgroundImage, {width: width - 50, height: height - (height > width ? 150 : 75)}]} />
          <TouchableOpacity style={[styles.trashcan, {opacity: isDragging ? 1 : 0}]}>
            <Ionicons name="trash-outline" size={40} color={colors.bg}  />
          </TouchableOpacity>
          {components.map((component, index) => {
            if (component.type === "non-drag"){
              return component.component
            }

            return (
              <DragComponent key={index} onDragStart={() => setIsDragging(true)} onDragEnd={(e) => onDragEnd(e, index)}>
                {component.component}
              </DragComponent>
            )
          })}
        </View>
      </SideMenu>
      <View style={[styles.tooltip, {display: tooltipOpen ? "flex" : "none"}]}>
        <View style={styles.arrowTip} />
        <Text style={styles.tooltipHeader}>Börja bygga</Text>
        <Text style={styles.tooltipText} >Klicka här för att lägga till komponenter</Text>
        <Button color="#fff" title='Okej' onPress={() => setTooltipOpen(false)} />
      </View>
      {data &&
      <BottomSheet snapPoints={snapPoints} backgroundStyle={styles.tutorialBackground}>
        <View style={styles.tutorial}>
          <Text style={styles.tutorialHeader}>{Stringify(data.header)}</Text>
          <Text style={styles.tutorialText}>{Stringify(data.steps[currentStep])}</Text>
          <View style={styles.tutorialSteps}>
            <TouchableOpacity onPress={() => setCurrentStep(step => Math.max(step - 1, 0))} style={styles.tutorialButton}><AntDesign name="caretleft" size={24} color="white" /></TouchableOpacity>
            <Text style={styles.tutorialStep}>Steg {currentStep + 1}</Text>
            <TouchableOpacity onPress={() => setCurrentStep(step => Math.min(step + 1, data.steps.length - 1))} style={styles.tutorialButton}><AntDesign name="caretright" size={24} color="white" /></TouchableOpacity>
          </View>
        </View>
      </BottomSheet>
      }
    </>
  );
}

const styles = StyleSheet.create({
  // Main
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  backgroundImage: {
    position: "absolute", 
    margin: 25,
  },
  trashcan: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 80,
    height: 80,
    borderRadius: 50,
    backgroundColor: colors.textLight,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Menu
  menu: {
    flex: 1,
    width: window.width,
    height: window.height,
    padding: 20,
    backgroundColor: colors.card,
  },
  menuHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: colors.header,
  },
  library: {
    height: 200,
    top: 0,
    left: 0,
    right: 0,
  },

  // Tutorial
  tutorial: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    height: "100%"
  },
  tutorialBackground: {
    backgroundColor: colors.card,
  },
  tutorialHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: colors.header,
  },
  tutorialText: {
    fontSize: 16,
    marginBottom: 20,
    color: colors.text,
  },
  tutorialSteps: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tutorialStep: {
    fontSize: 16,
    color: colors.text,
    marginHorizontal: 20,
  },
  tutorialButton: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Tooltip
  tooltip: {
    position: 'absolute',
    top: 30,
    right: 40,
    width: 200,
    height: 150,
    backgroundColor: colors.primary,
    borderRadius: 10,
    borderTopRightRadius: 0,
    padding: 15,
    justifyContent: 'space-between',
    alignItems: "flex-start"
  },
  arrowTip: {
    position: 'absolute',
    top: -20,
    right: 0,
    width: 0,
    height: 0,
    borderColor: colors.primary,
    borderBottomWidth: 20,
    borderLeftWidth: 30,
    borderLeftColor: 'transparent',
  },
  tooltipHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: "white",
    marginBottom: 10,
  },
  tooltipText: {
    color: "#ddd",
  },
});
