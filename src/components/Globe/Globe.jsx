import { React } from 'react'
import useStore from '../../store'

/**
 * Renders the globe
 * This component is only a colored sphere
 */
const Globe = () => {
  const { color } = useStore((state) => state.params.globe)

  return (
    <mesh>
      <sphereBufferGeometry args={[1, 400, 400]} />
      <meshPhysicalMaterial color={color} />
    </mesh>
  )
}

export default Globe
