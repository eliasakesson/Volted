import React, { useEffect, useState } from 'react';
import { Button, Dimensions, Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CreateComponent from '../components/CreateComponent';
import DragComponent from '../components/DragComponent';
import Battery from '../components/electronics/Battery';
import Resistor from '../components/electronics/Resistor';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import SideMenu from '@chakrahq/react-native-side-menu';
import { ReactNativeZoomableViewWithGestures } from '@openspacelabs/react-native-zoomable-view';

export default function SandboxScreen({ navigation }) {

  const [isDragging, setIsDragging] = useState(false)
  const [components, setComponents] = useState([])
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [slidingPercentage, setSlidingPercentage] = useState(0)

  const onDragEnd = (position, index) => {
    setIsDragging(false)
    // If component is dropped inside trashcan, remove it from the components array
    if (position.x > Dimensions.get("screen").width - 200 && position.y > Dimensions.get("screen").height - 200){
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
          <AntDesign name="plus" size={30} color="white" style={{marginRight: 10}} />
        </TouchableOpacity>
      ),
    });
  }, [navigation])

  const libraryComponents = [
    <Battery />,
    <Resistor />
  ]

  const menu = (
    <View style={styles.menu}>
      <Text style={styles.menuHeader}>Komponenter</Text>
      <View style={styles.library}>
        {libraryComponents.map((component, index) => {
          return (
            <CreateComponent key={index} setComponents={setComponents}>
              {component}
            </CreateComponent>
          )
        })}
      </View>
    </View>
  )

  return (
    <SideMenu menu={menu} isOpen={sidebarOpen} onChange={(open) => setSidebarOpen(open)} menuPosition="right" autoClosing={false}>
      <View style={styles.container}>
        <ImageBackground resizeMode='repeat' source={require('../assets/dots.png')} style={{width: '100%', height: '100%', position: "absolute"}} />
        <TouchableOpacity style={[styles.trashcan, {opacity: isDragging ? 1 : 0}]}>
          <Ionicons name="trash-outline" size={40} color="#999"  />
        </TouchableOpacity>
        <View style={styles.area}>
          {components.map((component, index) => {
            return (
              <DragComponent key={index} onDragStart={() => setIsDragging(true)} onDragEnd={(e) => onDragEnd(e, index)}>
                {component}
              </DragComponent>
            )
          })}
        </View>
      </View>
    </SideMenu>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3e4553',
  },
  area: {
    
  },
  library: {
    height: 200,
    top: 0,
    left: 0,
    right: 0,
  },
  trashcan: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 80,
    height: 80,
    borderRadius: 50,
    backgroundColor: '#313642',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menu: {
    flex: 1,
    width: window.width,
    height: window.height,
    padding: 20,
  },
  menuHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
  menuItem: {
    fontSize: 16,
    padding: 10,
    margin: 5,
    textAlign: 'center',
    borderWidth: 0.5,
    borderColor: '#d6d7da',
  },
});
