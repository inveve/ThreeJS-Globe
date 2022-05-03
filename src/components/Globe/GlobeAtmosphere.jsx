import { React } from 'react'
import useStore from '../../store'
import shader from '../../shaders/Halo'

/**
 * Renders the globe Atmosphere
 * This is an underlay for the globe, simulates a glowing effect
 */
const GlobeAtmosphere = () => {
  const { haloInner, haloOuter } = useStore((state) => state.params.globe)
  return (
    <mesh>
      <sphereBufferGeometry args={[1.1, 400, 400]} />
      <shaderMaterial
        {...shader}
        uniforms={{
          uColorInner: { value: haloInner },
          uColorOuter: { value: haloOuter },
        }}
      />
    </mesh>
  )
}

export default GlobeAtmosphere
