import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import DragComponent from '../DragComponent'
import { Svg, Line } from 'react-native-svg'

export default function Wire(props) {

    const [id] = useState(Number((Math.random()).toFixed(6) * 1e6))

    useEffect(() => {
        const { channel1, channel2 } = props

        console.log("Wire: ", channel1, channel2)
        channel1?.subscribe({callback: (message) => {
            if (message.sender.indexOf(id) === -1) {
                channel2?.send({...message, sender: [...message.sender, id]})
            }
        }, subscriber: id})

        channel2?.subscribe({callback: (message) => {
            if (message.sender.indexOf(id) === -1) {
                channel1?.send({...message, sender: [...message.sender, id]})
            }
        }, subscriber: id})
    }, [props.channel1, props.channel2])

    const [position, setPosition] = useState({x1: 0, y2: 0, x2: 0, y2: 0})
    const [line, setLine] = useState({x1: 75, y1: 95, x2: 175, y2: 95})

    const onDrag1 = ({x1, y1}) => {
        setPosition({...position, x1, y1})
    }

    const onDragEnd1 = ({x1, y1}) => {
        setPosition({...position, x1, y1})
        props.onDragEnd({...position, x1, y1}) 
    }

    const onDrag2 = ({x1: x2, y1: y2}) => {
        setPosition({...position, x2, y2})
    }

    const onDragEnd2 = ({x1: x2, y1: y2}) => {
        setPosition({...position, x2, y2})
        props.onDragEnd({...position, x2, y2})
    }

    useEffect(() => {
        setLine({x1: position.x1 + 20, y1: position.y1 + 20, x2: position.x2 + 20, y2: position.y2 + 20})
    }, [position])

    if (props.disabled) return (
        <View style={styles.container}>
            <Svg style={styles.svg}><Line style={styles.line} x1={20} y={18.25} x2={95}></Line></Svg>
            <View style={styles.dragger}></View>
            <View style={styles.dragger}></View>
        </View>
    )

  return (
    <>
        <Svg style={styles.svg}><Line style={styles.line} {...line}></Line></Svg>
        <DragComponent zIndex={50} onDragStart={() => props.onDragStart()} onDrag={onDrag1} onDragEnd={onDragEnd1} startY={props.startY}>
            <View style={styles.dragger}></View>
        </DragComponent>
        <DragComponent zIndex={50} onDragStart={() => props.onDragStart()} onDrag={onDrag2} onDragEnd={onDragEnd2} startX={175} startY={props.startY} >
            <View style={styles.dragger}></View>
        </DragComponent>
    </>
  )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 90,
        marginLeft: -7.5,
        zIndex: 50,
    },
    dragger: {
        width: 25,
        height: 25,
        backgroundColor: 'gray',
        borderRadius: 12.5,
        transform: [{translateX: 7.5}, {translateY: 7.5}],
        zIndex: 50,
        borderColor: 'black',
        borderWidth: 2,
    },
    svg: {
        position: 'absolute',
        zIndex: 49,
    },
    line: {
        stroke: 'black',
        strokeWidth: 10,
    }
})