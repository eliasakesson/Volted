import React, { useEffect, useState, useRef, useMemo } from 'react';
import { Button, Dimensions, Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { colors } from '../colors';
import { useWindowDimensions } from 'react-native';
import SideMenu from '@chakrahq/react-native-side-menu';
import BottomSheet from '@gorhom/bottom-sheet';

import CreateComponent from '../components/CreateComponent';
import DragComponent from '../components/DragComponent';
import Battery from '../components/electronics/Battery';
import Resistor from '../components/electronics/Resistor';
import Wire from '../components/electronics/Wire';
import Lamp from '../components/electronics/Lamp';

export default function SandboxScreen({ route, navigation }) {

  const { data } = route?.params || {};

  const [isDragging, setIsDragging] = useState(false)
  const [components, setComponents] = useState([])
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const [tooltipOpen, setTooltipOpen] = useState(true)

  const [currentStep, setCurrentStep] = useState(0)

  const snapPoints = useMemo(() => ['15%', '50%'], []);

  const { width, height } = useWindowDimensions();

  const onDragEnd = (position, index) => {
    setIsDragging(false)

    let newComponents = [...components]

    // Check if component is over trashcan, if so, delete it
    newComponents = checkForDeletion(newComponents, index)
    if (!newComponents) return
    
    // Set the new position of the component
    newComponents[index].x1 = position.x1
    newComponents[index].y1 = position.y1
    newComponents[index].x2 = position.x2
    newComponents[index].y2 = position.y2

    if (newComponents[index].type === 'wire'){
      console.log("Component is wire")

      // Check if wire is connected to component
      newComponents.forEach((component, i) => {
        if (component.type !== 'wire'){
          console.log("Component is not wire")
          // Reset channels
          if (newComponents[i].channel1 === newComponents[index].channel1){
            newComponents[i].channel1 = null
          }
          if (newComponents[i].channel2 === newComponents[index].channel1){
            newComponents[i].channel2 = null
          }
          if (newComponents[i].channel1 === newComponents[index].channel2){
            newComponents[i].channel1 = null
          }
          if (newComponents[i].channel2 === newComponents[index].channel2){
            newComponents[i].channel2 = null
          }

          // Wires x1 and y1 connected to components x1 and y1
          // Components channel 1 should be wires channel 1
          if (position.x1 === component.x1 && position.y1 === component.y1){
            console.log("Wires x1 and y1 connected to components x1 and y1")
            newComponents[i].channel1 = newComponents[index].channel1
          }
          // Wires x1 and y1 connected to components x2 and y2
          // Components channel 2 should be wires channel 1
          if (position.x1 === component.x2 && position.y1 === component.y2){
            console.log("Wires x1 and y1 connected to components x2 and y2")
            newComponents[i].channel2 = newComponents[index].channel1
          }
          // Wires x2 and y2 connected to components x1 and y1
          // Components channel 1 should be wires channel 2
          if (position.x2 === component.x1 && position.y2 === component.y1){
            console.log("Wires x2 and y2 connected to components x1 and y1")
            newComponents[i].channel1 = newComponents[index].channel2
          }
          // Wires x2 and y2 connected to components x2 and y2
          // Components channel 2 should be wires channel 2
          if (position.x2 === component.x2 && position.y2 === component.y2){
            console.log("Wires x2 and y2 connected to components x2 and y2")
            newComponents[i].channel2 = newComponents[index].channel2
          }
        }
      })
    }

    console.log(newComponents)
    setComponents(newComponents)
  }

  const checkForDeletion = (components, index) => {
    const component = components[index]
    const {x1, y1, x2, y2} = component

    // If component is dropped inside trashcan, remove it from the components array
    if (x1 > width - 150 && y1 > height - 200 || x2 > width - 200 && y2 > height - 200){
      components.splice(index, 1)

      components.forEach((component, i) => {
        if (component.receiverIndex === index){
          components[i].receiverIndex = null
        }
      })

      setComponents(components)
      return null
    }

    return components
  }

  useEffect(() => {
    if (data) navigation.setOptions({ title: data.title })

    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => setSidebarOpen((open) => !open)}>
          <AntDesign name="plus" size={30} color={colors.header} style={{marginRight: 10}} />
        </TouchableOpacity>
      ),
    });

    if (data && data.startItems){
      const newComponents = [...components]

      for (let index = 0; index < data.startItems.length; index++) {
        const component = libraryComponents.find((component) => component.name === data.startItems[index])
        console.log(component)
        if (component){
          const newComponent = createComponent(component)
          newComponents.push(newComponent)
        }
      }

      setComponents(newComponents)
    }

    setCurrentStep(0)
  }, [navigation])

  const createComponent = (component) => {
    if (component.type === "wire"){
      const channel1 = null
      const channel2 = null
  
      return {
        component: component.component,
        type: component.type,
        channel1: channel1,
        channel2: channel2,
      }
    }

    return {
      component: component.component,
      type: component.type,
    }
  }

  useEffect(() => {
    if (sidebarOpen && tooltipOpen) setTooltipOpen(false)
  }, [sidebarOpen])

  useEffect(() => {
    setSidebarOpen(false)
  }, [components])

  const libraryComponents = [
    {component: <Battery />, type: "", name: "Battery"},
    {component: <Resistor strength={"SVAG"} />, type: "", name: "Resistor SVAG"},
    {component: <Resistor strength={"MEDEL"} />, type: "", name: "Resistor MEDEL"},
    {component: <Resistor strength={"STARK"} />, type: "", name: "Resistor STARK"},
    {component: <Lamp />, type: "", name: "Lamp"},
    {component: <Wire />, libraryComponent: <Wire disabled />, type: "wire", name: "Wire"},
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
          <TouchableOpacity style={[styles.trashcan, {opacity: isDragging ? 1 : 0, bottom: data ? 120 : 30}]}>
            <Ionicons name="trash-outline" size={40} color={colors.bg}  />
          </TouchableOpacity>
          {components.map((component, index) => {
            if (component.type === "wire"){
              return React.cloneElement(component.component, {key: index, onDragStart: () => setIsDragging(true), onDragEnd: (e) => onDragEnd(e, index), startY : 75 + index * 50, channel1: component.channel1, channel2: component.channel2})
            }

            return (
              <DragComponent key={index} onDragStart={() => setIsDragging(true)} onDragEnd={(e) => onDragEnd(e, index)} startY={75 + index * 50}>
                {React.cloneElement(component.component, {channel1: component.channel1, channel2: component.channel2})}
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
          <Text style={styles.tutorialHeader}>{data.title}</Text>
          <Text style={styles.tutorialText}>{data.steps[currentStep]}</Text>
          <View style={styles.tutorialSteps}>
            {currentStep > 0 &&
              <TouchableOpacity onPress={() => setCurrentStep(step => Math.max(step - 1, 0))} style={[styles.tutorialButton, {marginLeft: 0, flex: 0, marginRight: 25}]}>
                <AntDesign name="caretleft" size={18} color="white" />
              </TouchableOpacity>
            }
            {currentStep < data.steps.length - 1 ?
              <TouchableOpacity onPress={() => setCurrentStep(step => Math.min(step + 1, data.steps.length - 1))} style={styles.tutorialButton}>
                <Text style={styles.tutorialButtonText}>Nästa Steg</Text>
              </TouchableOpacity> :
              <TouchableOpacity onPress={() => navigation.navigate("Success", { data })} style={styles.tutorialButton}>
                <Text style={styles.tutorialButtonText}>Testa koppling</Text>
              </TouchableOpacity>
            }
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
    position: 'relative',
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
    paddingVertical: 20,
    height: "100%"
  },
  tutorialBackground: {
    backgroundColor: colors.card,
  },
  tutorialHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 25,
    color: colors.header,
  },
  tutorialText: {
    fontSize: 16,
    marginBottom: 20,
    color: colors.text,
  },
  tutorialSteps: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: "auto",
    paddingBottom: 25,
  },
  tutorialStep: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginLeft: 10,
  },
  tutorialButton: {
    borderRadius: 10,
    backgroundColor: colors.primary,
    padding: 16,
    alignItems: 'center',
    marginLeft: "auto",
    flex: 1,
  },
  tutorialButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: 'bold',
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
