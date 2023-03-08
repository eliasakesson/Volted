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
import MPMC from '../MPMC';
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

export default function SandboxScreen({ route, navigation }) {

  const { data } = route?.params || {};

  const [components, setComponents] = useState([])
  const [componentsToCreate, setComponentsToCreate] = useState([])
  
  const [isDragging, setIsDragging] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [tooltipOpen, setTooltipOpen] = useState(true)
  const [currentStep, setCurrentStep] = useState(0)

  const snapPoints = useMemo(() => ['15%', '50%'], []);
  const { width, height } = useWindowDimensions();

  const onDragEnd = (position, index) => {
    setIsDragging(false)

    let newComponents = [...components]

    const {x1, y1, x2, y2} = position

    if (newComponents[index].x1 == x1 && newComponents[index].y1 == y1 && newComponents[index].x2 == x2 && newComponents[index].y2 == y2) return

    // Set the new position of the component
    newComponents[index].x1 = x1
    newComponents[index].y1 = y1
    newComponents[index].x2 = x2
    newComponents[index].y2 = y2

    // Check if component is over trashcan, if so, delete it
    newComponents = checkForDeletion(newComponents, index)
    if (!newComponents) return

    newComponents = checkConnection(newComponents, index)

    console.log(newComponents)
    setComponents(newComponents)
  }

  const checkForDeletion = (components, index) => {
    const component = components[index]
    const {x1, y1, x2, y2} = component

    // If component is dropped inside trashcan, remove it from the components array
    if (x1 > width - 150 && y1 > height - 200 || x2 > width - 200 && y2 > height - 200){
      if (component.type === 'wire') {
        components.forEach(element => {
          if (element.channel1 === component.channel1) element.channel1 = null
          if (element.channel2 === component.channel1) element.channel2 = null
          if (element.channel1 === component.channel2) element.channel1 = null
          if (element.channel2 === component.channel2) element.channel2 = null
        });
      }

      components.splice(index, 1)

      setComponents(components)
      return null
    }

    return components
  }

  const resetComponentChannels = (component, dragComponent) => {
    if (component.channel1 === dragComponent.channel1) {
      component.channel1 = null;
    }
    if (component.channel2 === dragComponent.channel1) {
      component.channel2 = null;
    }
    if (component.channel1 === dragComponent.channel2) {
      component.channel1 = null;
    }
    if (component.channel2 === dragComponent.channel2) {
      component.channel2 = null;
    }
  };
  
  const connectComponentToWire = (component, wire) => {
    const { x1, y1, x2, y2 } = wire;
    if (x1 === component.x1 && y1 === component.y1) {
      component.channel1 = wire.channel1;
    }
    if (x1 === component.x2 && y1 === component.y2) {
      component.channel2 = wire.channel1;
    }
    if (x2 === component.x1 && y2 === component.y1) {
      component.channel1 = wire.channel2;
    }
    if (x2 === component.x2 && y2 === component.y2) {
      component.channel2 = wire.channel2;
    }
  };
  
  const connectWireToComponent = (wire, component) => {
    const { x1, y1, x2, y2 } = wire;
    if (x1 === component.x1 && y1 === component.y1) {
      component.channel1 = wire.channel1;
    }
    if (x1 === component.x2 && y1 === component.y2) {
      component.channel2 = wire.channel1;
    }
    if (x2 === component.x1 && y2 === component.y1) {
      component.channel1 = wire.channel2;
    }
    if (x2 === component.x2 && y2 === component.y2) {
      component.channel2 = wire.channel2;
    }
  };
  
  const checkConnection = (components, index) => {
    const dragComponent = components[index];
  
    if (dragComponent.type === "wire") {
      components.forEach((component) => {
        if (component.type !== "wire") {
          resetComponentChannels(component, dragComponent);
          connectComponentToWire(component, dragComponent);
        }
      });
    } else {
      dragComponent.channel1 = null;
      dragComponent.channel2 = null;
  
      components.forEach((component) => {
        if (component.type === "wire") {
          connectWireToComponent(component, dragComponent);
        }
      });
    }
  
    components[index] = dragComponent;
    return components;
  };

  useEffect(() => {
    if (data) navigation.setOptions({ title: data.title })

    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => setSidebarOpen((open) => !open)}>
          <AntDesign name="plus" size={30} color={colors.header} style={{marginRight: 10}} />
        </TouchableOpacity>
      ),
    });

    if (components.length === 0 && data && data.startItems){
      const componentNames = data.startItems.map((item) => libraryComponents.find((component) => component.name === item))

      setComponentsToCreate(componentNames)
    }

    setCurrentStep(0)
  }, [navigation])

  useEffect(() => {
    if (sidebarOpen && tooltipOpen) setTooltipOpen(false)
  }, [sidebarOpen])

  useEffect(() => {
    setSidebarOpen(false)
  }, [components])

  const libraryComponents = [
    {component: <Wire />, libraryComponent: <Wire disabled />, type: "wire", name: "Sladd"},
    {component: <Battery />, type: "", name: "Batteri"},
    {component: <Resistor strength={"SVAG"} />, type: "", name: "Resistor Svag"},
    {component: <Resistor strength={"MEDEL"} />, type: "", name: "Resistor Medel"},
    {component: <Resistor strength={"STARK"} />, type: "", name: "Resistor Stark"},
    {component: <Lamp />, type: "", name: "Lampa"},
  ]

  const menu = (
    <View style={styles.menu}>
      <Text style={styles.menuHeader}>Komponenter</Text>
      <View style={styles.library}>
        {libraryComponents.map((component, index) => {
          return (
            <CreateComponent {...component} key={index} setComponents={setComponents} componentsToCreate={componentsToCreate} setComponentsToCreate={setComponentsToCreate} />
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
