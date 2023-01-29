import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import DragComponent from '../DragComponent'
import { Svg, Line } from 'react-native-svg'

export default function Wire() {

    const [line, setLine] = useState({x1: 75, y1: 95, x2: 150, y2: 95})

    const onDrag1 = ({x, y}) => {
        setLine({...line, x1: x, y1: y + 20})
    }

    const onDragEnd1 = ({x, y}) => {
        setLine({...line, x1: x, y1: y + 20})
    }

    const onDrag2 = ({x, y}) => {
        setLine({...line, x2: x, y2: y + 20})
    }

    const onDragEnd2 = ({x, y}) => {
        setLine({...line, x2: x, y2: y + 20})
    }

  return (
    <>
        <Svg style={styles.svg}><Line style={styles.line} {...line}></Line></Svg>
        <DragComponent onDrag={onDrag1} onDragEnd={onDragEnd1}>
            <View style={styles.dragger}></View>
        </DragComponent>
        <DragComponent onDrag={onDrag2} onDragEnd={onDragEnd2} startX={150} >
            <View style={styles.dragger}></View>
        </DragComponent>
    </>
  )
}

const styles = StyleSheet.create({
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