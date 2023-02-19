import React from 'react'
import { TouchableOpacity } from 'react-native'
import { channel } from 'mpmc'
import MPMC from '../MPMC';

export default function CreateComponent(props) {

  const { component, libraryComponent, type, setComponents } = props
  const channel1 = new MPMC()
  const channel2 = new MPMC()

  const createComponent = () => {
    if (setComponents){
      if (type === 'wire') {
        setComponents((prev) => [...prev, { component, type, channel1, channel2 }])
      } else {
        setComponents((prev) => [...prev, { component, type }])
      }
    }
  }

  return (
    <TouchableOpacity style={{marginBottom: 20}} onPress={() => createComponent()}>
        {libraryComponent || component}
    </TouchableOpacity>
  )
}
