import React from 'react'
import { TouchableOpacity } from 'react-native'

export default function CreateComponent(props) {

  const { component, libraryComponent, type, setComponents } = props

    const createComponent = () => {
      if (setComponents){
        setComponents((prev) => [...prev, { component, type }])
      }
    }

  return (
    <TouchableOpacity style={{marginBottom: 20}} onPress={() => createComponent()}>
        {libraryComponent || component}
    </TouchableOpacity>
  )
}
