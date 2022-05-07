import React, { useEffect, useRef } from 'react'
import { Vector3 } from 'three'
import { useFrame } from '@react-three/fiber'
import wave from '../../shaders/wave'

/**
 * Wave effect Component
 */
const ArcWave = ({ position }) => {
  const ref = useRef(null)

  useFrame(({ clock }) => {
    ref.current.material.uniforms.uTime.value = clock.getElapsedTime()
  })
  useEffect(() => {
    ref.current.position.y += 0.002
    ref.current.lookAt(new Vector3(0, 0, 0))
  }, [])

  return (
    <mesh position={position} ref={ref}>
      <planeGeometry args={[0.1, 0.1, 20]} />
      <shaderMaterial {...wave} />
    </mesh>
  )
}
export default ArcWave
