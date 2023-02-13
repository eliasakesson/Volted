import React from 'react'
import { TouchableOpacity } from 'react-native'
import { channel } from 'mpmc'

export default function CreateComponent(props) {

  const { component, libraryComponent, type, setComponents } = props
  const [sender1, receiver1] = channel();
  const [sender2, receiver2] = channel();

  const createComponent = () => {
    if (setComponents){
      setComponents((prev) => [...prev, { component, type, sender1, receiver1, sender2, receiver2 }])
    }
  }

  return (
    <TouchableOpacity style={{marginBottom: 20}} onPress={() => createComponent()}>
        {libraryComponent || component}
    </TouchableOpacity>
  )
}
