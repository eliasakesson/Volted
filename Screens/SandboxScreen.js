import React, { useEffect, useState, useMemo } from 'react';
import { Button, Dimensions, Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { colors } from '../colors';
import { useWindowDimensions } from 'react-native';
import SideMenu from '@chakrahq/react-native-side-menu';
import BottomSheet from '@gorhom/bottom-sheet';
import { SandboxContext } from '../components/contexts';

import CreateComponent from '../components/CreateComponent';
import DragComponent from '../components/DragComponent';
import Battery from '../components/electronics/Battery';
import Resistor from '../components/electronics/Resistor';
import Wire from '../components/electronics/Wire';
import Lamp from '../components/electronics/Lamp';
import { LogBox } from 'react-native';
import SandboxProject from '../components/SandboxProject';

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

  const { width, height } = useWindowDimensions();

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
  }, [navigation])

  useEffect(() => {
    if (sidebarOpen && tooltipOpen) setTooltipOpen(false)
  }, [sidebarOpen])

  useEffect(() => {
    setSidebarOpen(false)
  }, [components])

  const libraryComponents = [
    {component: <Wire />, name: "Sladd"},
    {component: <Battery />, name: "Batteri"},
    {component: <Resistor strength={"SVAG"} />, name: "Resistor Svag"},
    {component: <Resistor strength={"MEDEL"} />, name: "Resistor Medel"},
    {component: <Resistor strength={"STARK"} />, name: "Resistor Stark"},
    {component: <Lamp />, name: "Lampa"},
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
    <SandboxContext.Provider value={{isDragging}}>
      <SideMenu menu={menu} isOpen={sidebarOpen} onChange={(open) => setSidebarOpen(open)} menuPosition="right">
        <View style={styles.container}>
          <ImageBackground resizeMode='repeat' source={require('../assets/dots.png')} style={[styles.backgroundImage, {width: width - 50, height: height - (height > width ? 150 : 75)}]} />
          <TouchableOpacity style={[styles.trashcan, {opacity: isDragging ? 1 : 0, bottom: data ? 120 : 30}]}>
            <Ionicons name="trash-outline" size={40} color={colors.bg}  />
          </TouchableOpacity>
          {components.map((component, index) => {
            if (component.name === "Sladd"){
              return React.cloneElement(component.component, {key: index, onDragStart: () => setIsDragging(true), onDragEnd: (e) => HandleComponentDragEnd(e, index, components, setComponents, setIsDragging, width, height), startY : 75 + index * 50, channel1: component.channel1, channel2: component.channel2})
            }

            return (
              <DragComponent key={index} onDragStart={() => setIsDragging(true)} onDragEnd={(e) => HandleComponentDragEnd(e, index, components, setComponents, setIsDragging, width, height)} startY={75 + index * 50}>
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
      <SandboxProject data={data} />
    </SandboxContext.Provider>
  );
}

const HandleComponentDragEnd = (position, index, components, setComponents, setIsDragging, width, height) => {
  const componentHasntMoved = (component, position) => {
    return component.x1 === position.x1 && component.y1 === position.y1 && component.x2 === position.x2 && component.y2 === position.y2
  }

  const assignPosition = (component, position) => {
    component.x1 = position.x1
    component.y1 = position.y1
    component.x2 = position.x2
    component.y2 = position.y2

    return component
  }

  const checkForDeletion = (components, index) => {
    const dragComponent = components[index]
    const {x1, y1, x2, y2} = dragComponent

    // If component is dropped inside trashcan, remove it from the components array
    if (x1 > width - 150 && y1 > height - 200 || x2 > width - 200 && y2 > height - 200){
      if (dragComponent.name === 'Sladd') {
        components.forEach((component, i) => {
          components[i] = resetComponentChannels(component, dragComponent)
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

    return component
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

    return component
  };
  
  const checkConnection = (components, index) => {
    const dragComponent = components[index]
    const {x1, y1, x2, y2} = dragComponent

    if (dragComponent.name === 'Sladd'){

      // Check if wire is connected to component
      components.forEach((component, i) => {
        if (component.name !== 'Sladd'){
          // Reset channels
          components[i] = resetComponentChannels(component, dragComponent)

          components[i] = connectWireToComponent(dragComponent, component)
        }
      })
    } else {
      dragComponent.channel1 = null
      dragComponent.channel2 = null

      // Check if component is connected to wire
      components.forEach((component, i) => {
        
        if (component.name === 'Sladd'){
          // Wires x1 and y1 connected to components x1 and y1
          // Components channel 1 should be wires channel 1
          if (x1 === component.x1 && y1 === component.y1){
            dragComponent.channel1 = components[i].channel1
          }
          // Wires x1 and y1 connected to components x2 and y2
          // Components channel 2 should be wires channel 1
          if (x1 === component.x2 && y1 === component.y2){
            dragComponent.channel2 = components[i].channel1
          }
          // Wires x2 and y2 connected to components x1 and y1
          // Components channel 1 should be wires channel 2
          if (x2 === component.x1 && y2 === component.y1){
            dragComponent.channel1 = components[i].channel2
          }
          // Wires x2 and y2 connected to components x2 and y2
          // Components channel 2 should be wires channel 2
          if (x2 === component.x2 && y2 === component.y2){
            dragComponent.channel2 = components[i].channel2
          }
        }
      })
    }

    components[index] = dragComponent

    return components
  };

  setIsDragging(false)
  console.log('drag end')
    
  let newComponents = [...components]

  if (componentHasntMoved(newComponents[index], position)) return
  console.log('component has moved')

  newComponents[index] = assignPosition(newComponents[index], position)

  // Check if component is over trashcan, if so, delete it
  newComponents = checkForDeletion(newComponents, index)
  if (!newComponents) return

  newComponents = checkConnection(newComponents, index)
  if (!newComponents) return

  setComponents(newComponents)
  console.log('new components', newComponents)
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
