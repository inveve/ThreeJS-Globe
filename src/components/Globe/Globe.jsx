import { React } from 'react'
import { green } from '../../lib/constants/color'
/**
 * Renders the globe
 * This component is only a colored sphere
 */
const Globe = () => {
  return (
    <mesh>
      <sphereBufferGeometry args={[1, 400, 400]} />
      <meshPhysicalMaterial color={green} />
    </mesh>
  )
}

export default Globe
