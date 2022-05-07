import React, { useRef, forwardRef, useState, useEffect } from 'react'
import { Color } from 'three'
import { Line as DreiLine } from '@react-three/drei'
import ArcPoint from './ArcPoint'
import ArcWave from './ArcWave'
const Arc = forwardRef(({ onMouseEnter, onMouseLeave, curve, target }, ref) => {
  const lineRef = useRef(null)
  const [hovered, setHovered] = useState(false)
  const [arrived, setArrived] = useState(false)
  const animation = useRef({
    ticksTo: 3,
    ticksFrom: 0,
    maxTicks: 400,
  })

  /**
   * @FixMe Hack:
   * UseFrame does not renders the curve properly if modifying the geometry points
   */
  useEffect(() => {
    const updated = setInterval(() => {
      const { ticksTo, maxTicks, ticksFrom } = animation.current
      animation.current.ticksTo = ticksTo + 3
      if (ticksTo > curve.length && !arrived) setArrived(true)
      if (ticksTo > maxTicks) animation.current.ticksFrom = ticksFrom + 3

      if (ticksFrom > curve.length - 3) {
        setArrived(false)
        clearInterval(updated)
        return
      }
      lineRef.current.geometry.setPositions(curve.slice(ticksFrom, ticksTo))
    }, 25)
    return () => clearInterval(updated)
  }, [arrived, curve])

  const onLineHover = () => {
    setHovered(true)
    document.body.style.cursor = 'pointer'
    onMouseEnter()
  }
  const onHoverLeave = () => {
    onMouseLeave()
    document.body.style.cursor = ''
    setHovered(false)
  }
  return (
    <group ref={ref}>
      <DreiLine
        ref={lineRef}
        onPointerOver={onLineHover}
        onPointerLeave={onHoverLeave}
        points={curve}
        color={!hovered ? new Color('hsl(190,80%,40%)') : new Color('white')}
        opacity={0.9}
        lineWidth={1.25}
        transparent={true}
      />
      {arrived && (
        <>
          <ArcPoint {...target} />
          <ArcWave {...target} />
        </>
      )}
    </group>
  )
})

export default Arc
