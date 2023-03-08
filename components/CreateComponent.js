import React, { useEffect } from 'react'
import { TouchableOpacity } from 'react-native'
import MPMC from '../MPMC';
import { Text } from 'react-native';
import { colors } from '../colors';

export default function CreateComponent(props) {

  const { component, name, setComponents, componentsToCreate, setComponentsToCreate } = props
  const channel1 = new MPMC()
  const channel2 = new MPMC()

  const createComponent = () => {
    if (setComponents){
      if (name === 'Sladd') {
        setComponents((prev) => [...prev, { component, name, channel1, channel2 }])
      } else {
        setComponents((prev) => [...prev, { component, name }])
      }
    }
  }

  useEffect(() => {
    const components = componentsToCreate.filter((c) => c.name === name)
    if (components.length === 0) return
    
    components.forEach((c) => {
      createComponent()
    })
    setComponentsToCreate((prev) => prev.filter((c) => c.name !== name))
  }, [componentsToCreate])

  return (
    <TouchableOpacity style={{marginBottom: 20}} onPress={() => createComponent()}>
      <Text style={{color: colors.text, fontWeight: "bold", marginBottom: 5}}>{name}</Text>
      {React.cloneElement(component, { disabled: true })}
    </TouchableOpacity>
  )
}
