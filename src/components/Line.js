import * as THREE from 'three'
import React, { useRef, forwardRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Line as DreiLine } from '@react-three/drei'
import calcPosFromLatLonRad from '../lib/calcPosFromLatLonRad'
import { Color } from 'three'
import useStore from '../store'

const getCurve = (from, to) => {
  const points = []

  for (let i = 0; i <= 20; i++) {
    let point = new THREE.Vector3().lerpVectors(from, to, i / 20)
    point.normalize()
    point.multiplyScalar(1 + 0.1 * Math.sin((Math.PI * i) / 20))
    points.push(point)
  }
  return new THREE.CatmullRomCurve3(points)
}

const Line = forwardRef(
  ({ from = [], to = [], onMouseEnter, onMouseLeave }, ref) => {
    const [hovered, setHovered] = useState(false)

    const line = {
      from: new THREE.Vector3(...calcPosFromLatLonRad(from[0], from[1], 1)),
      to: new THREE.Vector3(...calcPosFromLatLonRad(to[0], to[1], 1)),
    }

    const curve = getCurve(line.from, line.to)
    const lineRef = useRef()

    useFrame((_, delta) =>
      lineRef.current.children.forEach(
        (line) => (line.material.uniforms.dashOffset.value -= delta * 0.5)
      )
    )

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
              !hovered ? new Color('rgb(130, 255, 23)') : new Color('white')
            }
            opacity={0.8}
            lineWidth={1.25}
            transparent={true}
            dashed
            dashScale={1}
          />
        </mesh>
      </group>
    )
  }
)

export default Line
