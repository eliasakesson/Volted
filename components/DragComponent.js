import React, { useEffect, useRef, useState } from 'react'
import { Dimensions, Text } from 'react-native'
import { PanGestureHandler } from 'react-native-gesture-handler'
import Animated, { runOnJS, useAnimatedGestureHandler, useSharedValue, withSpring } from 'react-native-reanimated'

export default function DragComponent(props) {

  const [position, setPosition] = useState({x: props.startX || 75, y: 75})
  const [viewSize, setViewSize] = useState({width: 0, height: 0})

  const margin = 25
  const headerHeight = 50
  const screenWidth = Dimensions.get('screen').width
  const screenHeight = Dimensions.get('screen').height

  const drag = useAnimatedGestureHandler({
    onStart: (e, ctx) => {
      ctx.x = position.x
      ctx.y = position.y

      if (props.onDragStart) runOnJS(props.onDragStart)()
    },
    onActive: (e, ctx) => {
      let x = e.translationX + ctx.x
      let y = e.translationY + ctx.y

      x = Math.max(margin, Math.min(x, screenWidth - margin - viewSize.width))
      y = Math.max(margin, Math.min(y, screenHeight - margin * 3 - viewSize.height - headerHeight))

      runOnJS(setPosition)({x, y})

      if (props.onDrag) runOnJS(props.onDrag)({x, y})
    },
    onFinish: (e, ctx) => {
      // Snap position to grid
      const gridSize = 50
      let x = e.translationX + ctx.x
      let y = e.translationY + ctx.y

      x = Math.round((x + margin) / gridSize) * gridSize - margin
      y = Math.round((y + margin) / gridSize) * gridSize - margin
      
      x = Math.max(margin, Math.min(x, screenWidth - margin - viewSize.width))
      y = Math.max(margin, Math.min(y, screenHeight - margin * 3 - viewSize.height - headerHeight))

      runOnJS(setPosition)({x, y})
      
      if (props.onDragEnd) runOnJS(props.onDragEnd)({x, y})
    }
  })

  if (props.disabled) return (
    props.children
  )

  return (
    <PanGestureHandler onGestureEvent={drag}>
      <Animated.View style={{left: position.x, top: position.y, position: "absolute"}} onLayout={(e) => {
        setViewSize({width: e.nativeEvent.layout.width, height: e.nativeEvent.layout.height})
      }}>
        {props.children}
        {/* <Text style={{color: 'white', position: "absolute"}}>{Math.round(position.x)}, {Math.round(position.y)}</Text> */}
      </Animated.View>
    </PanGestureHandler>
  )
}