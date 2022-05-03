import { React } from 'react'
import { useTexture } from '@react-three/drei'
import shader from '../../shaders/globeMap'

const GlobeMap = () => {
  const alpha = useTexture('earthspec1k.jpg')
  return (
    <points>
      <sphereBufferGeometry args={[1.001, 400, 400]} />
      <shaderMaterial
        {...shader}
        uniforms={{
          visibility: {
            value: alpha,
          },
          shift: {
            value: 0,
          },
          size: {
            value: 0.15,
          },
          scale: {
            value: 100,
          },
        }}
      />
    </points>
  )
}
export default GlobeMap
