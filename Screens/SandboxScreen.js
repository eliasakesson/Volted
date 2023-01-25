import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CreateComponent from '../components/CreateComponent';
import DragComponent from '../components/DragComponent';
import Battery from '../components/electronics/Battery';
import Resistor from '../components/electronics/Resistor';

export default function SandboxScreen() {

  const [components, setComponents] = useState([])

  const onDragEnd = (position, index) => {
    // If component is dropped inside library, remove it
    if (position.y <= 200) {
      setComponents((prev) => {
        const newComponents = [...prev]
        newComponents.splice(index, 1)
        return newComponents
      })
      return
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.library}>
        <CreateComponent setComponents={setComponents}>
          <Battery />
        </CreateComponent>
        <CreateComponent setComponents={setComponents}>
          <Resistor />
        </CreateComponent>
      </View>
      {components.map((component, index) => {
        return (
          <DragComponent key={index} onDragEnd={(e) => onDragEnd(e, index)}>
            {component}
          </DragComponent>
        )
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  library: {
    position: 'absolute',
    height: 200,
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'slategrey',
    paddingHorizontal: 25,
    paddingTop: 80,
    flexDirection: 'row'
  }
});
