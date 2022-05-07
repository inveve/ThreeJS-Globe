import React, { useRef, useEffect } from 'react'
import { Line as DreiLine } from '@react-three/drei'
import { Vector3 } from 'three'
import ArcPoint from './ArcPoint'
import ArcWave from './ArcWave'
import calcPosFromLatLonRad from '../../lib/calcPosFromLatLonRad'
import toggleMeshVisibility from '../../lib/toggleMeshVisibility'
import getLineCurve from '../../lib/getLineCurve'
import { teal } from '../../lib/constants/color'

/**
 * An CatmullRomCurve3 Arc
 */
const Arc = ({ onMouseEnter, onMouseLeave, gop, gm }) => {
  const groupRef = useRef(null)
  const hovered = useRef(false)
  const arrived = useRef(false)
  const ended = useRef(false)

  const animation = useRef({
    ticksTo: 3,
    ticksFrom: 0,
    maxTicks: 400,
  })

  const originPosition = calcPosFromLatLonRad(gm.lat, gm.lon, 1)
  const targetPosition = calcPosFromLatLonRad(gop.lat, gop.lon, 1)

  const curve = getLineCurve(
    new Vector3(...originPosition),
    new Vector3(...targetPosition)
  ).points

  /**
   * @FixMe Hack:
   * UseFrame does not renders the curve properly if modifying the geometry points during runtime.
   */
  useEffect(() => {
    const [arc, point, wave] = groupRef.current.children
    toggleMeshVisibility(point, wave)

    const updated = setInterval(() => {
      const { ticksTo, maxTicks, ticksFrom } = animation.current

      if (ticksTo > curve.length && !arrived.current) {
        arrived.current = true
        toggleMeshVisibility(point, wave)
      }

      if (ticksFrom > curve.length - 3) {
        arrived.current = false
        ended.current = true
        toggleMeshVisibility(point, wave)
        clearInterval(updated)
        return
      }

      animation.current.ticksTo = ticksTo + 3
      if (ticksTo > maxTicks) animation.current.ticksFrom = ticksFrom + 3
      arc.geometry.setPositions(curve.slice(ticksFrom, ticksTo))
    }, 25)
    return () => clearInterval(updated)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onHover = () => {
    const arc = groupRef.current.children[0]
    arc.material.color.set('white')
    hovered.current = true
    document.body.style.cursor = 'pointer'
    onMouseEnter()
  }
  const onHoverLeave = () => {
    const arc = groupRef.current.children[0]
    arc.material.color.set(teal)
    hovered.current = false
    document.body.style.cursor = ''
    onMouseLeave()
  }

  return (
    <group ref={groupRef}>
      <DreiLine
        onPointerOver={onHover}
        onPointerLeave={onHoverLeave}
        points={curve}
        color={teal}
        visible={!ended.current}
        opacity={0.9}
        lineWidth={1.25}
        transparent={true}
      />
      <ArcPoint position={targetPosition} />
      <ArcWave position={targetPosition} />
    </group>
  )
}

export default Arc
