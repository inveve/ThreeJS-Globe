import calcPosFromLatLonRad from '../lib/calcPosFromLatLonRad'
import { Color } from 'three'
import { useFrame } from '@react-three/fiber'
import { React, useRef } from 'react'
import useStore from '../store'

const BallPoint = ({ lat, lon }) => {
  const coordinates = calcPosFromLatLonRad(lat, lon, 1)
  const colorRef = useRef(null)
  const { color } = useStore((state) => state.params.dots)
  useFrame(() => {
    colorRef.current.color = new Color(
      `rgb(${~~color.value.r},${~~color.value.g},${~~color.value.b})`
    )
  })

  return (
    <mesh position={coordinates}>
      <sphereBufferGeometry args={[0.01, 20, 20]} />
      <meshBasicMaterial
        ref={colorRef}
        color={new Color('red')}
        opacity={0.8}
        transparent={true}
      />
    </mesh>
  )
}
export default BallPoint
