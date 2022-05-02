import { useFrame } from '@react-three/fiber'
import { useRef, useEffect } from 'react'
import { Vector3 } from 'three'
import tower from '../shaders/tower'

import calcPosFromLatLonRad from '../lib/calcPosFromLatLonRad'

const Tower = ({ lat, lon }) => {
  const ref = useRef(null)
  const ref2 = useRef(null)
  const shaderRef = useRef(null)
  const position = new Vector3(...calcPosFromLatLonRad(lat, lon, 1))
  const position2 = new Vector3(...calcPosFromLatLonRad(lat, lon, 1.1))

  useEffect(() => {
    ref.current.lookAt(new Vector3(0, 0, 0))
    ref.current.rotateX(Math.PI / 2)
    ref2.current.lookAt(new Vector3(0, 0, 0))
    ref2.current.rotateX(Math.PI / 2)
  }, [])

  useFrame(({ clock }) => {
    shaderRef.current.uniforms.uTime.value = clock.getElapsedTime()
    ref.current.scale.y = Math.sin(clock.getElapsedTime() * 0.5)
  })

  return (
    <group>
      <mesh position={position} ref={ref}>
        <boxGeometry args={[0.008, 0.18, 0.008]} />
        <shaderMaterial {...tower} ref={shaderRef} />
      </mesh>
      <mesh position={position2} ref={ref2}>
        <boxGeometry args={[0.007, 0.007, 0.007]} />
        <meshBasicMaterial color={'white'} />
      </mesh>
    </group>
  )
}
export default Tower
