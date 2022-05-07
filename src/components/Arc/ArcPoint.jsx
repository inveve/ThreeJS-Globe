import { React } from 'react'
import { teal } from '../../lib/constants/color'
/**
 * A Sphere Component, signalizes the end of the Arc
 */
const ArcPoint = ({ position }) => {
  return (
    <mesh position={position}>
      <sphereBufferGeometry args={[0.01, 20, 20]} />
      <meshBasicMaterial opacity={0.8} color={teal} transparent={true} />
    </mesh>
  )
}
export default ArcPoint
