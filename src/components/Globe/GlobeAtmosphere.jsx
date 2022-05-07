import { React } from 'react'
import shader from '../../shaders/halo'
import { darkGreen } from '../../lib/constants/color'
/**
 * Renders the globe Atmosphere
 * This is an underlay for the globe, simulates a glowing effect
 */
const GlobeAtmosphere = () => {
  return (
    <mesh>
      <sphereBufferGeometry args={[1.1, 400, 400]} />
      <shaderMaterial
        {...shader}
        uniforms={{
          uColor: { value: darkGreen },
        }}
      />
    </mesh>
  )
}

export default GlobeAtmosphere
