import React, { useEffect } from 'react'
import calcPosFromLatLonRad from '../../lib/calcPosFromLatLonRad'
import { useRef } from 'react'
import { Vector3 } from 'three'
import wave from '../../shaders/wave'
import { useFrame } from '@react-three/fiber'

const ArcWave = ({ lat, lon }) => {
  const coordinates = calcPosFromLatLonRad(lat, lon, 1)
  const ref = useRef(null)
  const shaderRef = useRef(null)

  useFrame(({ clock }) => {
    shaderRef.current.uniforms.uTime.value = clock.getElapsedTime()
  })
  useEffect(() => {
    ref.current.position.y += 0.002
    ref.current.lookAt(new Vector3(0, 0, 0))
  }, [])

  return (
    <>
      <mesh position={coordinates} ref={ref}>
        <planeGeometry args={[0.1, 0.1, 20]} />
        <shaderMaterial {...wave} ref={shaderRef} />
      </mesh>
    </>
  )
}
export default ArcWave
