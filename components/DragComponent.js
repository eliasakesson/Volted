import React, { useEffect, useRef, useState } from 'react'
import { Dimensions, Text } from 'react-native'
import { PanGestureHandler } from 'react-native-gesture-handler'
import Animated, { runOnJS, useAnimatedGestureHandler, useSharedValue, withSpring } from 'react-native-reanimated'

export default function DragComponent(props) {

  const [position, setPosition] = useState({x: props.startX || 75, y: props.startY || 75})
  const [viewSize, setViewSize] = useState({width: 0, height: 0})
  const [hasLayouted, setHasLayouted] = useState(false)

  const margin = 25
  const headerHeight = 50
  const screenWidth = Dimensions.get('screen').width
  const screenHeight = Dimensions.get('screen').height

  const drag = useAnimatedGestureHandler({
    onStart: (e, ctx) => {
      ctx.offsetX = position.x - e.absoluteX
      ctx.offsetY = position.y - e.absoluteY

      if (props.onDragStart) runOnJS(props.onDragStart)()
    },
    onActive: (e, ctx) => {
      let x = e.absoluteX + ctx.offsetX
      let y = e.absoluteY + ctx.offsetY

      // x = Math.max(margin, Math.min(x, screenWidth - margin - viewSize.width))
      // y = Math.max(margin, Math.min(y, screenHeight - margin * 3 - viewSize.height - headerHeight))

      runOnJS(setPosition)({x, y})

      if (props.onDrag) runOnJS(props.onDrag)({x1: x, y1: y, x2: x + viewSize.width - 40, y2: y})
    },
    onFinish: (e, ctx) => {
      // Snap position to grid
      const gridSize = 50
      let x = e.absoluteX + ctx.offsetX
      let y = e.absoluteY + ctx.offsetY

      // x = Math.max(margin, Math.min(x, screenWidth - margin - viewSize.width))
      // y = Math.max(margin, Math.min(y, screenHeight - margin * 3 - viewSize.height - headerHeight))
      
      x = Math.round((x + margin) / gridSize) * gridSize - margin
      y = Math.round((y + margin) / gridSize) * gridSize - margin  

      runOnJS(setPosition)({x, y})
      
      if (props.onDragEnd) runOnJS(props.onDragEnd)({x1: x, y1: y, x2: x + viewSize.width - 40, y2: y})
    }
  })

  const onLayout = (e) => {
    if (!hasLayouted) {
      setViewSize({width: e.nativeEvent.layout.width, height: e.nativeEvent.layout.height})
      if (props.onDragEnd) props.onDragEnd({x1: e.nativeEvent.layout.x, y1: e.nativeEvent.layout.y, x2: e.nativeEvent.layout.x + e.nativeEvent.layout.width - 40, y2: e.nativeEvent.layout.y})
      setHasLayouted(true)
    }
  }

  if (props.disabled) 
    return props.children

  return (
    <PanGestureHandler onGestureEvent={drag}>
      <Animated.View style={{left: position?.x, top: position?.y, position: "absolute", zIndex: (props.zIndex || 0)}} onLayout={onLayout}>
        {props.children}
      </Animated.View>
    </PanGestureHandler>
  )
}