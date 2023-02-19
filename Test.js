import React, { useEffect } from 'react'
import { View } from 'react-native'
import MPMC from './MPMC'

export default function Test() {

    const channel = new MPMC()

    useEffect(() => {
        channel.subscribe((message) => {
            console.log("Test: ", message)
        })

        channel.send(1)

        return () => {
            channel.unsubscribe()
        }
    }, [])

  return (
    <View>
        
    </View>
  )
}
