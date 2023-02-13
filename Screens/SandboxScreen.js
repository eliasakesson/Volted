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

    let newComponents = [...components]

    const centerX = position.x + (position.x - position.x2)
    const centerY = position.y + (position.y - position.y2)

    // If component is dropped inside trashcan, remove it from the components array
    if (centerX > width - 200 && centerY > height - 200){
      newComponents.splice(index, 1)

      newComponents.forEach((component, i) => {
        if (component.receiverIndex === index){
          newComponents[i].receiverIndex = null
        }
      })

      return setComponents(newComponents)
    }
    
    // Set the new position of the component
    newComponents[index].x = position.x
    newComponents[index].y = position.y
    newComponents[index].x2 = position.x2
    newComponents[index].y2 = position.y2

    // Reset the receiverIndex of the component if it was connected to another component
    if (newComponents[index].receiverIndex1){
      newComponents[newComponents[index].receiverIndex1].receiverIndex2 = null
    } else if (newComponents[index].receiverIndex2){
      newComponents[newComponents[index].receiverIndex2].receiverIndex1 = null
    }

    newComponents[index].receiverIndex1 = null
    newComponents[index].receiverIndex2 = null

    // Check if the component is dropped on top of another component and connect them if so
    newComponents.forEach((component, i) => {
      if (i !== index && component.x === position.x && component.y === position.y && component.type !== "wire"){
        newComponents[index].receiverIndex1 = i
        newComponents[i].receiverIndex2 = index
      } else if (i !== index && component.x2 === position.x && component.y2 === position.y && component.type === "wire"){
        newComponents[index].receiverIndex2 = i
        newComponents[i].receiverIndex1 = index
      }
    })

    console.log(newComponents)

    setComponents(newComponents)
  }

  useEffect(() => {
    if (data) navigation.setOptions({ title: data.title })

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
    {component: <Wire />, libraryComponent: <Wire disabled />, type: "wire"},
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
          <TouchableOpacity style={[styles.trashcan, {opacity: isDragging ? 1 : 0, bottom: data ? 100 : 30}]}>
            <Ionicons name="trash-outline" size={40} color={colors.bg}  />
          </TouchableOpacity>
          {components.map((component, index) => {
            if (component.type === "wire"){
              return React.cloneElement(component.component, {key: index, onDragStart: () => setIsDragging(true), onDragEnd: (e) => onDragEnd(e, index), sender1: component.sender1, sender2: component.sender2, receiver1: components[component.receiverIndex]?.receiver1, receiver2: components[component.receiverIndex]?.receiver2, startY : 75 + index * 50})
            }

            return (
              <DragComponent key={index} onDragStart={() => setIsDragging(true)} onDragEnd={(e) => onDragEnd(e, index)} startY={75 + index * 50}>
                {React.cloneElement(component.component, {sender1: component.sender1, sender2: component.sender2, receiver1: components[component.receiverIndex]?.receiver1, receiver2: components[component.receiverIndex]?.receiver2})}
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
