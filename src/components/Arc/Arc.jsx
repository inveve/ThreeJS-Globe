import * as THREE from 'three'
import React, { useRef, forwardRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Line as DreiLine } from '@react-three/drei'
import calcPosFromLatLonRad from '../../lib/calcPosFromLatLonRad'
import { Color } from 'three'
import getLineCurve from '../../lib/getLineCurve'

const Arc = forwardRef(
  ({ from = [], to = [], onMouseEnter, onMouseLeave }, ref) => {
    const line = {
      from: new THREE.Vector3(...calcPosFromLatLonRad(from[0], from[1], 1)),
      to: new THREE.Vector3(...calcPosFromLatLonRad(to[0], to[1], 1)),
    }

    const curve = getLineCurve(line.from, line.to)
    const lineRef = useRef()

    useFrame((_, delta) => {
      lineRef.current.children.forEach(
        (line) => (line.material.uniforms.dashOffset.value -= delta * 1)
      )
    })
    const [hovered, setHovered] = useState(false)

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
      <group>
        <mesh
          ref={lineRef}
          onPointerOver={onLineHover}
          onPointerLeave={onHoverLeave}
        >
          <DreiLine
            points={curve.points}
            color={
              !hovered ? new Color('hsl(190,80%,40%)') : new Color('white')
            }
            opacity={0.9}
            lineWidth={1.25}
            transparent={true}
            dashed
          />
        </mesh>
      </group>
    )
  }
)

export default Arc
