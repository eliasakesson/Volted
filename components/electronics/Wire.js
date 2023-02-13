import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import DragComponent from '../DragComponent'
import { Svg, Line } from 'react-native-svg'

export default function Wire(props) {

    useEffect(() => {
        props.receiver1?.forEach((message) => {
            console.log("Wire: ", message)
            props.sender2?.send(message)
        })

        props.receiver2?.forEach((message) => {
            console.log("Wire: ", message)
            props.sender1?.send(message)
        })
    }, [props.receiver1, props.receiver2])

    const [line, setLine] = useState({x1: 75, y1: 95, x2: 150, y2: 95})

    const onDrag1 = ({x, y}) => {
        setLine({...line, x1: x, y1: y + 20})
    }

    const onDragEnd1 = ({x, y}) => {
        setLine({...line, x1: x, y1: y + 20})
        props.onDragEnd({x, y}) 
    }

    const onDrag2 = ({x, y}) => {
        setLine({...line, x2: x, y2: y + 20})
    }

    const onDragEnd2 = ({x, y}) => {
        setLine({...line, x2: x, y2: y + 20})
        props.onDragEnd({x, y})
    }

    if (props.disabled) return (
        <View style={styles.container}>
            <Svg style={styles.svg}><Line style={styles.line} x1={0} y={18.25} x2={75}></Line></Svg>
            <View style={styles.dragger}></View>
            <View style={styles.dragger}></View>
        </View>
    )

  return (
    <>
        <Svg style={styles.svg}><Line style={styles.line} {...line}></Line></Svg>
        <DragComponent disabled={props.disabled} onDragStart={() => props.onDragStart()} onDrag={onDrag1} onDragEnd={onDragEnd1} startY={props.startY}>
            <View style={styles.dragger}></View>
        </DragComponent>
        <DragComponent disabled={props.disabled} onDragStart={() => props.onDragStart()} onDrag={onDrag2} onDragEnd={onDragEnd2} startX={175} startY={props.startY} >
            <View style={styles.dragger}></View>
        </DragComponent>
    </>
  )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 100,
        marginLeft: 12.5,
    },
    dragger: {
        width: 25,
        height: 25,
        backgroundColor: 'red',
        borderRadius: 12.5,
        transform: [{translateX: -12.5}, {translateY: 6.25}],
    },
    svg: {
        position: 'absolute',
    },
    line: {
        stroke: 'black',
        strokeWidth: 10,
    }
})