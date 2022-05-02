import shader from '../shaders/Halo'

import { useFrame } from '@react-three/fiber'
import { React, useRef } from 'react'
import useStore from '../store'

const EarthAtmos = () => {
  const colorRef = useRef(null)
  const { haloInner, haloOuter } = useStore((state) => state.params.earth)
  useFrame(() => {
    colorRef.current.uniforms.color1 = { value: haloInner.value }
    colorRef.current.uniforms.color2 = { value: haloOuter.value }
  })
  return (
    <mesh>
      <sphereBufferGeometry args={[1.1, 400, 400]} />
      <shaderMaterial {...shader} ref={colorRef} />
    </mesh>
  )
}

export default EarthAtmos
