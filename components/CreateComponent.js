import React from 'react'
import { View } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import ElectricComponent from './ElectricComponent'

export default function CreateComponent(props) {

    const createComponent = () => {
        props.setComponents((prev) => [...prev, props.children])
    }

  return (
    <TouchableWithoutFeedback onPress={() => createComponent()}>
        {props.children}
    </TouchableWithoutFeedback>
  )
}
