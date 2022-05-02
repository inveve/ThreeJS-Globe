import { useFrame } from '@react-three/fiber'
import { React, useRef } from 'react'
import useStore from '../store'

const Earth = () => {
  const ref = useRef(null)
  const colorRef = useRef(null)
  const { color } = useStore((state) => state.params.earth)
  useFrame(() => {
    colorRef.current.color = color.value
  })
  return (
    <mesh ref={ref}>
      <sphereBufferGeometry args={[1, 400, 400]} />
      <meshPhysicalMaterial ref={colorRef} />
    </mesh>
  )
}
export default Earth
