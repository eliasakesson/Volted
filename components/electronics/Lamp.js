import React, { useEffect } from 'react'
import { View, StyleSheet, Text } from 'react-native'

export default function Lamp(props) {

    const [lightActive, setLightActive] = useState(false)

    const [lightTimeout, setLightTimeout] = useState(null)

    useEffect(() => {
        props.receiver1?.forEach((message) => {
            console.log("Lamp: ", message)
            props.sender2?.send(message)

            if (message === 1) {
                setLightActive(true)

                if (lightTimeout) {
                    clearTimeout(lightTimeout)
                }

                setLightTimeout(setTimeout(() => {
                    setLightActive(false)
                }, 500))
            }
        })

        props.receiver2?.forEach((message) => {
            console.log("Lamp: ", message)
            props.sender1?.send(message)

            if (message === 1) {
                setLightActive(true)

                if (lightTimeout) {
                    clearTimeout(lightTimeout)
                }

                setLightTimeout(setTimeout(() => {
                    setLightActive(false)
                }, 500))
            }
        })
    }, [props.receiver1, props.receiver2])

    const disableLight = () => {
        setLightActive(false)
    }

  return (
    <View style={styles.lampBase}>
        <View style={[styles.lamp, {backgroundColor: lightActive ? "yellow" : "grey"}]}></View>
    </View>
  )
}

const styles = StyleSheet.create({
    lampBase: {
        width: 100,
        height: 40,
        borderRadius: 10,
        overflow: 'hidden',
        flexDirection: 'row',
        zIndex: 5,
    },
    lamp: {
        height: 60,
        width: 60,
        borderRadius: 30,
        position: 'absolute',
        top: -20,
        left: 20,
    }
})