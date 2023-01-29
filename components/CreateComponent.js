import React from 'react'
import { TouchableOpacity } from 'react-native'

export default function CreateComponent(props) {

    const createComponent = () => {
      if (props.setComponents){
        props.setComponents((prev) => [...prev, {component: props.children, type: props.type || ""}])
      }
    }

  return (
    <TouchableOpacity style={{marginBottom: 20}} onPress={() => createComponent()}>
        {props.children}
    </TouchableOpacity>
  )
}
