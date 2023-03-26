import React, { useEffect, useState, useRef, useContext } from 'react'
import { View, StyleSheet } from 'react-native'
import { SandboxContext } from '../contexts'

export default function Lamp(props) {

    const [id] = useState(Number((Math.random()).toFixed(6) * 1e6))
    const { isDragging } = useContext(SandboxContext)

    const [lightStrength, setLightStrength] = useState(0)
    const timeoutRef = useRef();

    useEffect(() => {
        const { channel1, channel2 } = props

        if (props.disabled) return

        channel1?.subscribe({callback: (message) => {
            if (message.sender.indexOf(id) === -1 && channel1 && channel2) {
                console.log("Lamp: ", message)
                channel2.send({...message, sender: [...message.sender, id]})

                if (message.volt > 0){
                    setLightStrength(message.volt)
                    clearTimeout(timeoutRef.current);
                    timeoutRef.current = setTimeout(() => {
                        setLightStrength(0);
                        // Clear interval ID reference
                        timeoutRef.current = undefined;
                    }, 600);
                }
            }
        }, subscriber: id})

        channel2?.subscribe({callback: (message) => {
            if (message.sender.indexOf(id) === -1 && channel1 && channel2) {
                console.log("Lamp: ", message)
                channel1.send({...message, sender: [...message.sender, id]})

                if (message.volt > 0){
                    setLightStrength(message.volt)
                    clearTimeout(timeoutRef.current);
                    timeoutRef.current = setTimeout(() => {
                        setLightStrength(0);
                        // Clear interval ID reference
                        timeoutRef.current = undefined;
                    }, 600);
                }
            }
        }, subscriber: id})

        return () => {
            channel1?.unsubscribe(id)
            channel2?.unsubscribe(id)

            clearInterval(timeoutRef.current);
            timeoutRef.current = undefined;
            setLightStrength(0);
        }
    }, [props.channel1, props.channel2])

  return (
    <View style={styles.lampBase}>
        <View style={[styles.baseSide, {borderBottomRightRadius: 0}]}></View>
        <View style={styles.baseCenter}>
            <View style={[styles.lamp, {backgroundColor: `rgba(255, 255, 0, ${lightStrength})`}]}>
                <View style={styles.lampCenter}></View>
            </View>
        </View>
        <View style={[styles.baseSide, {borderBottomLeftRadius: 0}]}></View>
        {!props.disabled && isDragging && <>
        <View style={[styles.dropCircle, {left: 7.5, top: 7.5}]}></View>
        <View style={[styles.dropCircle, {right: 7.5, top: 7.5}]}></View>
      </>}
    </View>
  )
}

const styles = StyleSheet.create({
    dropCircle: {
        height: 25,
        width: 25,
        borderRadius : 12.5,
        borderStyle: 'dashed',
        borderWidth: 1, 
        borderColor: '#ffffffcc',
        position: 'absolute',
    },
    lampBase: {
        width: 140,
        height: 40,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'flex-end',
        zIndex: 5,
    },
    baseCenter: {
        width: 60,
        height: 10,
        backgroundColor: '#555',
        borderColor: 'black',
        borderTopWidth: 2,
        borderBottomWidth: 2,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    baseSide: {
        width: 40,
        height: 40,
        borderRadius: 10,
        backgroundColor: '#555',
        borderColor: 'black',
        borderWidth: 2,

        alignItems: 'center',
        justifyContent: 'center',
    },
    lamp: {
        height: 60,
        width: 50,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        borderWidth: 2,
        borderBottomWidth: 0,
        borderColor: 'black',
        marginBottom: 8,

        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    lampCenter: {
        width: 20,
        height: 30,
        borderWidth: 2,
        borderBottomWidth: 0,
        borderColor: 'black',
        backgroundColor: '#ffff0050',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
    },
})