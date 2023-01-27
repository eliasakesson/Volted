import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import ElectricComponent from './ElectricComponent'

export default function CreateComponent(props) {

    const createComponent = () => {
      if (props.setComponents){
        props.setComponents((prev) => [...prev, props.children])
      }
    }

  return (
    <TouchableOpacity style={{marginBottom: 20}} onPress={() => createComponent()}>
        {props.children}
    </TouchableOpacity>
  )
}
