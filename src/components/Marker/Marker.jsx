import { useFrame } from '@react-three/fiber'
import { useRef, useEffect } from 'react'
import { Vector3 } from 'three'
import marker from '../../shaders/marker'
import calcPosFromLatLonRad from '../../lib/calcPosFromLatLonRad'

/**
 * A Marker Component, represents a box shape geometry with a dot on top
 */
const Marker = ({ lat, lon, onMouseEnter, onMouseLeave }) => {
  const markerRef = useRef(null)
  const dotRef = useRef(null)
  const markerPosition = new Vector3(...calcPosFromLatLonRad(lat, lon, 1))
  const dotPosition = new Vector3(...calcPosFromLatLonRad(lat, lon, 1.1))

  const onHover = () => {
    document.body.style.cursor = 'pointer'
    onMouseEnter()
  }
  const onHoverLeave = () => {
    document.body.style.cursor = ''
    onMouseLeave()
  }

  useEffect(() => {
    markerRef.current.lookAt(new Vector3(0, 0, 0))
    markerRef.current.rotateX(Math.PI / 2)
    dotRef.current.lookAt(new Vector3(0, 0, 0))
    dotRef.current.rotateX(Math.PI / 2)
  }, [])

  useFrame(({ clock }) => {
    markerRef.current.material.uniforms.uTime.value = clock.getElapsedTime()
    markerRef.current.scale.y = Math.sin(clock.getElapsedTime() * 0.5)
  })

  return (
    <>
      <mesh
        position={markerPosition}
        ref={markerRef}
        onPointerOver={onHover}
        onPointerLeave={onHoverLeave}
      >
        <boxGeometry args={[0.008, 0.18, 0.008]} />
        <shaderMaterial {...marker} />
      </mesh>
      <mesh position={dotPosition} ref={dotRef}>
        <boxGeometry args={[0.006, 0.006, 0.006]} />
        <meshBasicMaterial color={'white'} />
      </mesh>
    </>
  )
}
export default Marker
