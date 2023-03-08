import React, { useEffect, useState, useRef, useContext } from 'react'
import { View, StyleSheet } from 'react-native'
import { SandboxContext } from '../contexts'

export default function Lamp(props) {

    const [id] = useState(Math.random())
    const { isDragging } = useContext(SandboxContext)

    const [lightActive, setLightActive] = useState(false)
    const timeoutRef = useRef();

    useEffect(() => {
        const { channel1, channel2 } = props

        channel1?.subscribe({callback: (message) => {
            if (message.sender !== id) {
                console.log("Lamp: ", message)
                channel2?.send({...message, sender: id})

                if (message.volt > 0){
                    setLightActive(true);
                    clearTimeout(timeoutRef.current);
                    timeoutRef.current = setTimeout(() => {
                        setLightActive(false);
                        // Clear interval ID reference
                        timeoutRef.current = undefined;
                    }, 600);
                }
            }
        }, subscriber: id})

        channel2?.subscribe({callback: (message) => {
            if (message.sender !== id) {
                console.log("Lamp: ", message)
                channel1?.send({...message, sender: id})

                if (message.volt > 0){
                    setLightActive(true);
                    clearTimeout(timeoutRef.current);
                    timeoutRef.current = setTimeout(() => {
                        setLightActive(false);
                        // Clear interval ID reference
                        timeoutRef.current = undefined;
                    }, 600);
                }
            }
        }, subscriber: id})

        return () => {
            channel1?.unsubscribe(id)
            channel2?.unsubscribe(id)
        }
    }, [props.channel1, props.channel2])

    useEffect(() => {
        return () => {
            clearInterval(timeoutRef.current);
            timeoutRef.current = undefined;
          };
    }, [])

  return (
    <View style={styles.lampBase}>
        <View style={[styles.baseSide, {borderBottomRightRadius: 0}]}></View>
        <View style={styles.baseCenter}>
            <View style={[styles.lamp, {backgroundColor: lightActive ? "#ffff0075" : "rgba(155, 155, 155, 0.25)"}]}>
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